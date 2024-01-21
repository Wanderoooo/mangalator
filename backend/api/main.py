from fastapi import FastAPI, HTTPException, Request
import base64
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import jwt

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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
  

@app.post("/signup")
async def signup(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.users
        collection.insert_one({"key": payload["key"]})
        return {"signup success"}
    except Exception as e:
        return {"insert failed!"}

@app.post("/login")
async def login(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        collection.find({"key": payload["key"]})
        return {"login success"}
    except Exception as e:
        return {"find failed!"}
    
@app.post("/add")
async def add(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        images = payload["image"]
        for image in images:
            collection.insert_one({"key": payload["key"], "image": image, "name": payload["name"]})
        return {"manga added successfully"}
    except Exception as e:
        return {"manga did not get added"}


@app.post("/remove")
async def remove(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        collection.delete_one({"key": payload["key"], "image": payload["image"]})
        return {"manga removed successfully"}
    except Exception as e:
        return {"manga did not get deleted"}


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
