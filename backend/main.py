from fastapi import FastAPI
import base64
import os
# from PIL import Image

app = FastAPI()
counter = 1
# create folder if does not exist

@app.get("/")
async def root():
    return {"message": "!!! root"}

@app.post("/input/{image_binary}")
async def input(image_binary):
    imgData = base64.b64decode(image_binary)
    fileName = f"C:/Users/Alissa Guo/Desktop/mangalator/backend/image/image_{counter}.jpg" # change username
    with open(fileName, 'wb') as f:
        f.write(imgData)
    
    counter+=1
    
    
    return {"image path": image_binary}
