#!/usr/bin/env node
const fetch = require('node-fetch');
const opn = require('opn');
const urlencode = require('urlencode');

const start = async (input) => {
    if (input.length == 0) {
        return
    }
    await load(input.join(" "))

    process.exit(0)
}

const load = async (input) => {
    const params = urlencode(input)
    let res
    try {
        res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Mzdd9ePiAgntA1GPsZbQpQ8m7gmD27CY&rating=g&q=${params}`).then(res => res.json())
    } catch (e) {
        console.error(e)
    }
    if (!(res.data && res.data.length > 0)) {
        console.error(`No images found for ${input}`)
        return
    }
    const images = res.data
    const selectedImage = images[randomMax(images.length)]
    const inMp4Url = selectedImage.images.original_mp4.mp4;
    opn(inMp4Url)
}

const randomMax = (max) => {
    return Math.floor(Math.random() * max)
}

start(process.argv.slice(2))