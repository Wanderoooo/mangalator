from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "!!! root"}

@app.post("/input/{image_path}")
async def input(image_path):
    return {"image path": image_path}
