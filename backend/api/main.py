from fastapi import FastAPI, HTTPException, Request
import base64
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import jwt
import string
import secrets
import os
import base64
from PIL import Image
from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path
import base64
from PIL import Image
from typing import List
import string
import subprocess
import os
import secrets
import sys
from io import BytesIO


app = FastAPI()
counter = 1
key = "nwhacks" # put in .env file
# create folder if does not exist

db = None

def get_database():
    global db

    # Check if the database is already initialized
    if db is None:
        CONNECTION_STRING = "mongodb+srv://nwhacks:nwhacks2024@cluster0.r4ciglc.mongodb.net/" # Replace with your actual connection string
        client = MongoClient(CONNECTION_STRING)
        db = client.mangalator
        
    return db

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
  
# payload: {"key": unique string user key}
@app.post("/signup")
async def signup(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.users
        user = collection.find_one({'key': payload["key"]})
        if user:
            return True
        collection.insert_one({'key': payload["key"]})
        return True
    except Exception as e:
        return HTTPException(status_code=404, detail="signup failed")


@app.post("/login")
async def login(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.users
        user = collection.find_one({'key': payload["key"]})
        if user:
            return True
        return False
    except Exception as e:
        return HTTPException(status_code=404, detail="login failed")

# generates a random string id (10^10 chance it is not unique....)
def generate_unique_string(length=10):
    characters = string.ascii_letters + string.digits
    unique_string = ''.join(secrets.choice(characters) for _ in range(length))
    return unique_string

def path_to_64string(path):
    with open(path, "rb") as image_file:
        # Read the binary data of the image
        binary_data = image_file.read()
        # Convert binary data to base64-encoded string
        base64_string = base64.b64encode(binary_data).decode("utf-8") 
        return "data:image/png;base64," + base64_string

# returns a list of unique paths given a list of base64 strings.
async def cook(files):
    # Save the uploaded image to the upload directory (optional)

    dir = generate_unique_string()
    file_path = f"../uploads/{dir}"
    os.makedirs(file_path, exist_ok=True)

    images = []

    for file in files:
        # Generate a unique filename for each image
        unique_filename = generate_unique_string() + ".png"
        image_path = os.path.join(file_path, unique_filename)
        
        try:
            # Save the uploaded image as JPEG
            base64_data = file.split(",")[1]
            image_data = base64.b64decode(base64_data)
            image = Image.open(BytesIO(image_data))
            image.save(image_path)
            images.append(unique_filename)
        except Exception as e:
            raise HTTPException(status_code=404, detail={e})
            
          

    translator_command = f"-m manga_translator -v --translator=deepl --detection-size 2560 --manga2eng -l ENG -i {file_path}" 

    # Construct the command using the Python executable path
    command = [sys.executable] + translator_command.split()

    # Run the command and wait for it to finish
    os.chdir("../manga-image-translator")
    try:
        result = subprocess.run(command, check=True)
    except:
        print("ok dont care")
    os.chdir("../api")
    
    directory_path = file_path + "-translated"
    # file_list = os.listdir(directory_path)
        
    for i in range(0, len(images)):
        images[i] = directory_path + "/" + images[i] 


    # Iterate over the files

    return images

# payload: {"key": unique string user key, "image": base64, "name": manga collection name}
# return: {"key", "image": image path, "name"?}
@app.post("/add")
async def add(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        images = payload["image"]
        imagePaths = await cook(images)
        translatedImages = []
        for i in range(0, len(imagePaths)): 
            path = imagePaths[i]    
            with open(path, "rb") as image_file:
                # Read the binary data of the image
                binary_data = image_file.read()
                # Convert binary data to base64-encoded string
                base64_string = base64.b64encode(binary_data).decode("utf-8") 
                
                translatedImages.append("data:image/png;base64," + base64_string)
                
        if (payload["key"]):
            for image in imagePaths:
                collection.insert_one({"key": payload["key"], "image": image, "name": payload["name"]})
                
        return {"translated": translatedImages, "name": payload["name"]}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error!!!: {e}")
    

# payload: {"key", "name"}
# return: [{"image": path}]
@app.post("/display") # display 1 collection of manga
async def display(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        pages = collection.find({"key": payload["key"], "name": payload["name"]})
        for page in pages:
            page["image"] = path_to_64string(page["image"])
            
        return {"pages": pages}
    except Exception as e:
        raise HTTPException(status_code=404, detail="pages display failed")

# payload: {"key": unique string user key}
# return: [{"name": manga name, "image": thumbnail path}]
@app.get("/dashboard")
async def dashboard(request: Request):
    get_database()
    dashboardArray = []
    try:
        payload = await request.json()
        print("after payload")
        collection = db.mangas
        print("after collection")
        names = collection.find({"key": payload["key"]}).distinct("name")
        print("after names", names)
        for name in names:
            imageArray = collection.find({"name": name}).sort([("_id", -1)])
            imageArray64 = []
            for image in imageArray:
                imageArray64.append(path_to_64string(image.get("image")))
            dashboardArray.append({"name":name, "data": imageArray64})
        return dashboardArray
    except Exception as e:
        raise HTTPException(status_code=404, detail="dashboard render failed")
            

@app.post("/removeone")
async def removeone(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        collection.delete_one({"key": payload["key"], "image": payload["image"]})
        return {"manga removed successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="manga (1) delete failed")

@app.post("/remove")
async def remove(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        collection.delete_many({"key": payload["key"], "name": payload["name"]})
        return {"manga collection removed successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="remove manga collection failed")

@app.get("/")
async def root():
    return {"message": "!!! root"}


# @app.post("/input/{image_binary}")
# async def input(image_binary):
#     imgData = base64.b64decode(image_binary)
#     fileName = f"C:/Users/Alissa Guo/Desktop/mangalator/backend/image/image_{counter}.jpg" # change username
#     with open(fileName, 'wb') as f:
#         f.write(imgData)
    
#     counter+=1
    
    
#     return {"image path": image_binary}

