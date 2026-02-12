## Start a local llm for dev mode

Install [Instruct Lab.](https://docs.instructlab.ai/)

```bash
source venv/bin/activate

ilab serve
```

## Run the Ionic app locally in dev mode

```bash
npm install

ionic serve
```

or use the Ionic VSCode plugin...

## Build the app for production

```bash
ionic build --prod
```

The output will be written in the `www` folder

## Build the container image and push it to the registry

```bash
podman build --platform=linux/amd64 -t quay.io/oschneid/chatbot:agv-1.0 .
```
If you want to run the container locally, execute:

```bash
podman run -it --rm -d -p 8080:8080 --name web quay.io/oschneid/chatbot:agv-1.0
```

Push the container image to the registry:

```bash
podman push quay.io/oschneid/chatbot:agv-1.0
```
