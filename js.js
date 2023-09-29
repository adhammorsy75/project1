document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector("#searchButton");
    const cardName = document.querySelector("#cardName");
    const cardImage = document.querySelector("#cardImage");
    const cardType = document.querySelector("#cardType");
    const cardAttribute = document.querySelector("#cardAttribute");
    const cardLevel = document.querySelector("#cardLevel");
    const cardDescription = document.querySelector("#cardDescription");
    const inputBar = document.querySelector("#inputBar");

    searchButton.addEventListener('click', async () => {
        const cardNameValue = inputBar.value.trim();

        if (cardNameValue) {
            try {
                const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardNameValue)}`);
                if (response.ok) {
                    const data = await response.json();

                    const card = data.data[0];

                    cardName.textContent = card.name;
                    cardImage.src = card.card_images[0].image_url;

                    cardType.textContent = `Card Type: ${card.type}`;
                    cardAttribute.textContent = `Attribute: ${card.attribute}`;
                    cardLevel.textContent = `Level/Rank: ${card.level}`;
                    cardDescription.textContent = `Card Description: ${card.desc}`;
                } else {
                    console.error("Error fetching data:", response.status, response.statusText);
                    clearCardData();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                clearCardData();
            }
        }
    });

    function clearCardData() {
        cardName.textContent = "";
        cardImage.src = "";
        cardType.textContent = "";
        cardAttribute.textContent = "";
        cardLevel.textContent = "";
        cardDescription.textContent = "";
    }
});
