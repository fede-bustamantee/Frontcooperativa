import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  formatDate,
  formatDateNumber,
  formatNumberToCurrency,
} from "@/utils/format-helpers";

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    color: "grey",
  },
  headerNombre: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 26,
    color: "grey",
  },
  institutionInfo: {
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  personalInfo: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 20,
  },
  infoTexto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellT: {
    margin: "auto",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    marginTop: 10,
    fontSize: 14,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "extraBold",
    textAlign: "right",
    marginRight: 30,
  },
  signature: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    textAlign: "center",
    borderTop: 1,
    borderColor: "#000",
    paddingTop: 5,
  },
});

// Componente PdfRecibo
const PdfRecibo = ({ alumno, pago }) => {
  if (!alumno || !pago) {
    return null; // Maneja el caso donde 'alumno' o 'pago' es undefined o null
  }

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src="/logo-isp.png" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.header}>
              Cooperadora Instituto Superior de Profesorado N°20
            </Text>
            <Text style={styles.headerNombre}>Senador Néstor Juan Zamaro</Text>
          </View>
        </View>
        <View style={styles.institutionInfo}>
          <Text style={styles.infoText}>
            Bv. Patria, Bv. Libertad y calle las Magnolias
          </Text>
          <Text style={styles.infoText}>Teléfono: (54)9 3498 4526026</Text>
          <Text style={styles.infoText}>Email: secretariaisp20@gmail.com</Text>
        </View>
        <View style={styles.personalInfo}>
          <Text style={styles.infoTexto}>
            Se ha recibido el importe según detalle, del alumno{" "}
            {alumno.apellido} {alumno.nombre} con DNI: {alumno.dni}.
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Fecha</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Detalle del Pago</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Monto</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {pago.cobro_id ? formatDateNumber(pago.fechaCreacion) : "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {pago.cobro_id ? pago.cobro_id.titulo : "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {pago.cobro_id
                  ? formatNumberToCurrency(pago.cobro_id.monto)
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.total}>
          Total:{" "}
          {pago.cobro_id ? formatNumberToCurrency(pago.cobro_id.monto) : "N/A"}
        </Text>
        <View style={styles.signature}>
          <View style={styles.signatureBox}>
            <Text>Firma del Alumno</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Firma y Sello directivo</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfRecibo;
