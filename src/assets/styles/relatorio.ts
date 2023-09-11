import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
    family: "Poppins",
    fonts: [
        {
            src: "/fonts/Poppins-Regular.ttf",
            fontWeight: "normal"
        },
        {
            src: "/fonts/Poppins-Bold.ttf",
            fontWeight: "bold"
        },
        {
            src: "/fonts/Poppins-ExtraBold.ttf",
            fontWeight: "ultrabold"
        }
    ]
})

const styles = StyleSheet.create({
    viewer: {
        width: "100%",
        height: "100vh"
    },
    page: {
        padding: "10% 0px"
    },
    marca: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    arara: {
        width: "10%"
    },
    moreu: {
        color: "#121d46",
        fontFamily: "Poppins",
        fontSize: "30pt",
        fontWeight: "ultrabold"
    },
    data: {
        alignSelf: "flex-end",
        marginRight: "10%",
        fontSize: "12pt"
    },
    titulo: {
        alignSelf: "center",
        margin: "7% 0px 3% 0px",
        color: "#121d46",
        fontFamily: "Poppins",
        fontSize: "20pt",
        fontWeight: "bold"
    },
    table: {
        fontFamily: "Poppins",
        display: "flex",
        width: "auto",
        margin: "0 auto",
        fontSize: "12pt",
        borderRadius: "10px"
        
    },
    tableHead: {
        backgroundColor: "#121d46",
        color: "white",
        borderTopLeftRadius: "2px",
        borderTopRightRadius: "2px"
    },
    
    tableRow: {
        flexDirection: "row",
        margin: "auto",
        padding: "0px 2px"
    },
    tableCol: {
        width: "16.6%",
    },
    tableCell: {
        padding: "2px 2%",
        textAlign: "left",
    },
    stripedZebra: {
        backgroundColor: "#88abc2"
    },
    notStriped: {
        backgroundColor: "#ffffff"
    }
});

export default styles;