import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  formatDate,
  formatDateNumber,
  formatNumberToCurrency,
} from "@/utils/format-helpers";

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  personalInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  infoText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#333",
    color: "#fff",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
  },
  tableCellT: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    color: "white",
    fontWeight: "extraBold",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    color: "#333",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 10,
    color: "#888",
  },
  resumenPagos: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1px solid #000",
    fontSize: 12,
    color: "black",
  },
  resumenHeader: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    color: "slategray",
    borderBottom: "1px solid #000",
  },
  resumenList: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  resumenItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderBottom: "1px solid #ddd",
  },
  resumenLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  resumenValue: {
    fontSize: 12,
    marginLeft: 10,
    color: "black",
  },
});

// Componente Document
const PdfReport = ({ alumno }) => {
  if (!alumno) {
    return null; // Maneja el caso donde 'alumno' es undefined o null
  }

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <Text style={styles.header}>
          Reporte de Pagos de {alumno.nombre} {alumno.apellido}
        </Text>
        <View style={styles.personalInfo}>
          <Text style={styles.infoText}>Nombre: {alumno.nombre}</Text>
          <Text style={styles.infoText}>Apellido: {alumno.apellido}</Text>
          <Text style={styles.infoText}>DNI: {alumno.dni}</Text>
          <Text style={styles.infoText}>Dirección: {alumno.direccion}</Text>
          <Text style={styles.infoText}>Teléfono: {alumno.telefono}</Text>
          <Text style={styles.infoText}>Email: {alumno.email}</Text>
          <Text style={styles.infoText}>
            Fecha de Nacimiento: {formatDate(alumno.fecha_nacimiento)}
          </Text>
          <Text style={styles.infoText}>
            Fecha de Ingreso: {formatDate(alumno.fecha_ingreso)}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Fecha</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Cobro</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Importe</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Estado</Text>
            </View>
          </View>
          {alumno.pagos && alumno.pagos.length > 0 ? (
            alumno.pagos.map((pago, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {pago.cobro_id
                      ? formatDateNumber(pago.fechaCreacion)
                      : "N/A"}
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
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {pago.pagado ? "Abonado" : "Pendiente"}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No hay pagos registrados.</Text>
          )}
        </View>
        <View style={styles.resumenPagos}>
          <Text style={styles.resumenHeader}>RESUMEN DE PAGOS:</Text>
          <View style={styles.resumenList}>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenLabel}>Total:</Text>
              <Text style={styles.resumenValue}>
                {formatNumberToCurrency(alumno.totalPagos)}
              </Text>
            </View>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenLabel}>Abonados:</Text>
              <Text style={styles.resumenValue}>
                {formatNumberToCurrency(alumno.pagosAbonados)}
              </Text>
            </View>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenLabel}>Saldos:</Text>
              <Text style={styles.resumenValue}>
                {formatNumberToCurrency(alumno.pagosPendientes)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfReport;
