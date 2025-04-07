function generateImage() {
    const prompt = document.getElementById("promptInput").value.trim();
    if (!prompt) {
        alert("Please enter a prompt!");
        return;
    }

    const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("imageContainer").innerHTML = "";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }
            return response.blob();
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = prompt;

            document.getElementById("imageContainer").appendChild(img);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to load image. Try a different prompt.");
        })
        .finally(() => {
            document.getElementById("loading").classList.add("hidden");
        });
}
