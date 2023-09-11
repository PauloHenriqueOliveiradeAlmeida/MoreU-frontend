function CheckType(value: string) {
    let type;
    switch (value) {
        case "p":
            type = "Periféricos";
            break;

        case "d":
            type = "Decorações";
            break;

        case "f":
            type = "Móveis";
            break;

        case "e":
            type = "Eletrônicos"
            break;
    
        default:
            type = value;
            break;
    }

    return type;
}

export default CheckType;