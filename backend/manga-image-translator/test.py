from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path
import shutil
import requests
import httpx
import base64
from PIL import Image
from typing import List
import hashlib
import string
import subprocess
import os
import secrets
import sys
from io import BytesIO

app = FastAPI()

# Directory to store uploaded images and results
upload_dir = Path("uploads")
result_dir = Path("result")

# Create directories if they don't exist
upload_dir.mkdir(parents=True, exist_ok=True)
result_dir.mkdir(parents=True, exist_ok=True)


# Endpoint to upload an image, process it, and return the resulting image
# http://127.0.0.1:5003
# http://127.0.0.1:5003/submit 
from fastapi import File, UploadFile

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    # Save the uploaded image to the upload directory (optional)
    file_path = f"uploads/{file.filename}"
    print(file_path)
    with open(file_path, 'rb') as file:
        base64_image = base64.b64encode(file.read()).decode('utf-8')

    # Send the file to the intermediary API
    url = "http://127.0.0.1:5003/inpaint_translate"
    files = {
        'base64Images':base64_image,
        'direction': 'auto',
        # 'target_language': "ENG",
        # 'inpainter':"lama_large",
        # 'translator': "google"
        }

    client = httpx.Client(timeout=300.0)
    response = client.post(url, json=files)

    response.raise_for_status()

    # Assuming the intermediary API returns a JSON response
    result_json = response.json()['img']

    return result_json

def generate_unique_string(length=10):
    characters = string.ascii_letters + string.digits
    unique_string = ''.join(secrets.choice(characters) for _ in range(length))
    return unique_string

@app.post("/cook/")
async def cook(files: List[UploadFile] = File(...)):
    # Save the uploaded image to the upload directory (optional)

    dir = generate_unique_string()
    file_path = f"uploads/{dir}"
    os.makedirs(file_path, exist_ok=True)

    images = []

    for file in files:
        # Generate a unique filename for each image
        unique_filename = generate_unique_string() + ".jpg"
        image_path = os.path.join(file_path, unique_filename)

        # Save the uploaded image as JPEG
        base64_data = file.split(",")[1]
        image_data = base64.b64decode(base64_data)
        image = Image.open(BytesIO(image_data))
        image.save(image_path)
        images.append(unique_filename)      

    translator_command = f"-m manga_translator -v --translator=google -l ENG -i {file_path}"

    # Construct the command using the Python executable path
    command = [sys.executable] + translator_command.split()

    # Run the command and wait for it to finish
    try:
        result = subprocess.run(command, check=True)
    except:
        print("ok dont care")
    
    directory_path = file_path + "-translated"
    # file_list = os.listdir(directory_path)

    for i in range(0, len(images)):
        images[i] = directory_path + "/" + images[i] 

    # Iterate over the files

    return images


def main():
    import uvicorn

    # Run the FastAPI app using Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

main()