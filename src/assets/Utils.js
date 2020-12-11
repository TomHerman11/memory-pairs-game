export function CardFactory(groupId) {
    return {
        groupId,
        isShow: false,
        cardIndex: 0,
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