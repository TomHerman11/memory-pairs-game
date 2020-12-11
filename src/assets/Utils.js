import * as _ from 'lodash';

export function CardFactory(groupId, imageFileName) {
    return {
        groupId,
        isShow: false,
        cardIndex: 0,
        imageFileName
    };
}

export function getGroupSizeAsString(groupSize) {
    const groupSizesStrings = {
        2: "pairs",
        3: "triplets",
        4: "quartets",
    };

    return groupSizesStrings[groupSize]
        ? groupSizesStrings[groupSize]
        : `${groupSize}-of-a-kind`;
}

export function getShuffledAnimalsFiles() {
    const animalsFiles = [
        "american-pekin-duck",
        "beaver",
        "camel",
        "cheetah",
        "deer",
        "dog",
        "duck",
        "elephant",
        "giraffe",
        "great-white-pelican",
        "green-sea-turtle",
        "hen",
        "horse",
        "kangaroo",
        "ladybug",
        "land-turtle",
        "lion",
        "mantis",
        "owl",
        "panda",
        "parrot",
        "pig",
        "rabbit",
        "ram",
        "rhino",
        "sheep",
        "snail",
        "toucan",
        "white-sea-turtle"
    ];
    return _.shuffle(_.map(animalsFiles, file => `${file}.jpg`));
}