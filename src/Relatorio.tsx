import { useLocation } from "react-router-dom";
import { Document, Page, View, Text, Image, PDFViewer } from "@react-pdf/renderer";
import styles from "./assets/styles/relatorio.ts";
import DateMask from "./utils/dateMask.ts";
import Ativos from "./types/ativos";
import MoneyMask from "./utils/moneyMask.ts";
import CheckType from "./utils/checkType.ts";

function Relatorio() {
    const location = useLocation();
    const datas: Ativos[] = location.state;
    let stripedZebra = false;


    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        <View style={styles.marca}>
                            <Image src="/arara.png" style={styles.arara}/>
                            <Text style={styles.moreu}>MoreÜ</Text>
                        </View>
                        
                        <Text style={styles.data}>Data de emissão: {DateMask(new Date().toISOString().split("T")[0])}</Text>
                        <Text style={styles.titulo}>Relatório de Ativos</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHead]}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Data Cadastro</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Nome</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Class.</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Quantidade</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Preço</Text>
                            </View>
                        </View>
                        {
                            datas.map((data, index) => {
                                stripedZebra = index % 2 != 0 ? true : false;
                                return (
                                    <View style={[styles.tableRow, stripedZebra ? styles.stripedZebra : styles.notStriped]} key={`row-${index}`}>
                                        <View style={styles.tableCol} key={`col-data-${index}`}>
                                            <Text style={styles.tableCell} key={`data-${index}`}>{DateMask(data.dataCadastroProduto)}</Text>
                                        </View>
                                        <View style={styles.tableCol} key={`col-nome-${index}`}>
                                            <Text style={styles.tableCell} key={`nome-${index}`}>{data.nomeProduto}</Text>
                                        </View>
                                        <View style={styles.tableCol} key={`col-tipo-${index}`}>
                                            <Text style={styles.tableCell} key={`tipo-${index}`}>{CheckType(data.tipoProduto)}</Text>
                                        </View>
                                        <View style={styles.tableCol} key={`col-qnt-${index}`}>
                                            <Text style={styles.tableCell} key={`qnt-${index}`}>{data.qntProduto}</Text>
                                        </View>
                                        <View style={styles.tableCol} key={`con-valor-${index}`}>
                                            <Text style={styles.tableCell} key={`valor-${index}`}>{MoneyMask(data.valorPagoProduto)}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default Relatorio;