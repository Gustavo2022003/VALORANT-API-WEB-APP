import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { capitalizeFirstLetter } from './utils/utils.js';
dotenv.config();

const app = express();
const port = process.env.PORT;
const URL = process.env.API_URL;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota para a página inicial
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(URL + "agents");
        const result = response.data;
        res.render("index.ejs", {
            content: result.data
        });
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para buscar um personagem
app.get("/searchCharacter/:character", async (req, res) => {
    try {
        const displayName = req.params.character.toLowerCase();
        let characterName = capitalizeFirstLetter(displayName);
        if (displayName === "kayo" || displayName === "kay/o") {
            characterName = "KAY/O";
        }

        const response = await axios.get(URL + "agents");
        const result = response.data.data;
        
        const playableCharacters = result.filter(objeto => objeto.isPlayableCharacter === true);
        const character = playableCharacters.find(objeto => objeto.displayName === characterName);

        res.render("searchCharacter.ejs", {
            content: character
        });
    } catch(error) {
        handleError(res, error);
    }
});

// Rota para pesquisar um personagem por nome
app.post("/getCharacterByName", async (req, res) => {
    try {
        const displayName = req.body.characterName.toLowerCase();
        let characterName = capitalizeFirstLetter(displayName);
        if (displayName === "kayo" || displayName === "kay/o") {
            characterName = "KAY/O";
        }

        const response = await axios.get(URL + "agents");
        const result = response.data.data;
        
        const playableCharacters = result.filter(objeto => objeto.isPlayableCharacter === true);
        const character = playableCharacters.find(objeto => objeto.displayName === characterName);

        res.redirect("/searchCharacter/"+character.displayName);
    } catch(error) {
        handleError(res, error);
    }
});

// Função para lidar com erros
function handleError(res, error) {
    res.status(500);
    console.log("Error: " + (error.response?.data || "Unknown error occurred"));
}

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server listening on: http://localhost/${port}`);
});
