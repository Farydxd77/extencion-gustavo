//////////////////////////////////////////////////////////////////////////////////////////////
// ADDON COMPLETO SIN LOGIN - SOPORTE, EXPORTAR CLIENTE, WAP, WAP2, CREAR MENSAJE
//////////////////////////////////////////////////////////////////////////////////////////////

async function iniciarAddon() {
    if (!window.location.href.startsWith("https://crm.cashimex.mx/#/detail")) return;

    const getTextAfterLabel = (label) => {
        return [...document.querySelectorAll("div.mb-10")]
            .find(el => el.innerText.trim().startsWith(label))
            ?.innerText.split(":").slice(1).join(":").trim() || "";
    };

    // BOTÓN EXPORTAR CLIENTE
    const btnExportarCliente = document.createElement("button"); 
    btnExportarCliente.innerText = "Exportar Cliente";
    Object.assign(btnExportarCliente.style, { 
        position: "fixed", 
        top: "20px", 
        right: "20px", 
        zIndex: 9999, 
        padding: "10px", 
        backgroundColor: "#3498db", 
        color: "#fff", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer" 
    });
    btnExportarCliente.onclick = () => {
        const nombre = getTextAfterLabel("Nombre");
        const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";
        const correo = getTextAfterLabel("Correo electrónico");
        const producto = getTextAfterLabel("Nombre del producto");
        const monto = getTextAfterLabel("Monto del contrato");
        const telefono = getTextAfterLabel("Teléfono");
        const texto = [nombre, app, correo, producto, monto, telefono].join("\t");
        navigator.clipboard.writeText(texto).then(() => alert("Datos del cliente copiados para Excel ✅"));
    };
    document.body.appendChild(btnExportarCliente);

    // BOTÓN SOPORTE
    const btnSoporte = document.createElement("button"); 
    btnSoporte.innerText = "SOPORTE";
    Object.assign(btnSoporte.style, { 
        position: "fixed", 
        top: "60px", 
        right: "20px", 
        zIndex: 9999, 
        padding: "10px", 
        backgroundColor: "#2ecc71", 
        color: "#fff", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer" 
    });
    btnSoporte.onclick = () => {
        const nombre = getTextAfterLabel("Nombre");
        const telefono = getTextAfterLabel("Teléfono");
        const telefonoMX = telefono ? `+52${telefono}` : "";
        const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";
        const producto = getTextAfterLabel("Nombre del producto");
        const monto = getTextAfterLabel("Monto del contrato");
        const importeDiv = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.trim().startsWith("Importe de la factura de reinversión"));
        const importe = importeDiv?.querySelector("span[style*='color: red']")?.textContent.trim() || "";

        const texto = `${nombre}\nTeléfono: ${telefonoMX}\nAPP: ${app}\nNombre del producto: ${producto}\nMonto del contrato: ${monto}\nImporte de la factura de reinversión: ${importe}`;
        navigator.clipboard.writeText(texto).then(() => alert("Copiado:\n" + texto));
    };
    document.body.appendChild(btnSoporte);

    // BOTÓN WAP
    const btnWAP = document.createElement("button"); 
    btnWAP.innerText = "WAP";
    Object.assign(btnWAP.style, { 
        position: "fixed", 
        top: "100px", 
        right: "20px", 
        zIndex: 9999, 
        padding: "10px", 
        backgroundColor: "#9b59b6", 
        color: "#fff", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer" 
    });
    btnWAP.onclick = () => {
        const nombre = getTextAfterLabel("Nombre");
        const producto = getTextAfterLabel("Nombre del producto");
        const monto = getTextAfterLabel("Monto del contrato");
        const importeDiv = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.trim().startsWith("Importe de la factura de reinversión"));
        const importe = importeDiv?.querySelector("span[style*='color: red']")?.textContent.trim() || "";

        const mensaje = `Hola *${nombre}* Exigimos el pago inmediato TRNSFERENCIA NO DEMORA MAS DE 2 MINUTOS Si no recibimos respuesta, nuestros asesores de zona se pondrán en contacto contigo mediante llamadas y mensajes con usted y CON SUS FAMILIARES Y AMIGOS.*
🚫 Evita que esta situación afecte tus relaciones personales y laborales.
**📢 IGNORAR SOLO HARÁ QUE SIGAMOS INSISTIENDO

*Nombre del producto:* *${producto}* *${monto}*
*Importe de la factura de reinversión:* *${importe}*`;

        navigator.clipboard.writeText(mensaje).then(() => alert("✅ Mensaje WAP copiado!"));
    };
    document.body.appendChild(btnWAP);

    // BOTÓN WAP2
const btnWAP2 = document.createElement("button"); 
btnWAP2.innerText = "WAP2";
Object.assign(btnWAP2.style, { 
    position: "fixed", 
    top: "140px", 
    right: "20px", 
    zIndex: 9999, 
    padding: "10px", 
    backgroundColor: "#e67e22", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
});
btnWAP2.onclick = () => {
    const nombre = getTextAfterLabel("Nombre");
    const producto = getTextAfterLabel("Nombre del producto");
    const monto = getTextAfterLabel("Monto del contrato");
    const importeDiv = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.trim().startsWith("Importe de la factura de reinversión"));
    const importe = importeDiv?.querySelector("span[style*='color: red']")?.textContent.trim() || "";

    const mensaje = `🚨buenos tardes Nombre: *${nombre}*   App: TodoCrédito
  Producto: *${producto}*  *${monto}* o prorrogra  *${importe}*  pesos

Lamentamos  informarle  que ha sido REGISTRADO COMO *CLIENTE  FRAUDULENTO* A pesar de nuestros  números intentos de contacto de buena fe  para resolver su deuda USTED HA  IGNORADO CADA UNO DE ELLOS   🚫🚫

AHORA INICIAREMOS UNA INVESTIGACION FORMAL EN SU CONTRA. Su REPUTACION SUFRIRA UN DAÑO IRREPARABLE. Esta es su ultima oportunidad para evitar las acciones que correspondan.🚨evite esto pagando en este momento`;

    navigator.clipboard.writeText(mensaje).then(() => alert("✅ Mensaje WAP2 copiado!"));
};
document.body.appendChild(btnWAP2);

    // CREAR MENSAJES PERSONALIZADOS
    const crearBotonMensaje = (nombreBoton, mensajePersonalizado, bottomPos) => {
        const contenedor = document.createElement("div");
        contenedor.style.position = "fixed"; 
        contenedor.style.right = "20px";
        contenedor.style.zIndex = 9999; 
        contenedor.style.display = "flex";
        contenedor.style.alignItems = "center"; 
        contenedor.style.gap = "5px";
        contenedor.style.bottom = `${bottomPos}px`; 
        contenedor.classList.add("btn-contenedor");

        const nuevoBoton = document.createElement("button"); 
        nuevoBoton.innerText = nombreBoton;
        Object.assign(nuevoBoton.style, { 
            padding: "10px", 
            backgroundColor: "#3498db", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
        });
        nuevoBoton.onclick = () => {
            const producto = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.includes("Nombre del producto:"))?.innerText.split(":")[1].trim() || "No encontrado";
            const monto = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.includes("Monto del contrato:"))?.innerText.split(":")[1].trim() || "No encontrado";
            const mensajeFinal = `${mensajePersonalizado}\n\nNombre del producto: ${producto}\nMonto del contrato: ${monto}`;
            navigator.clipboard.writeText(mensajeFinal).then(() => alert("✅ Mensaje copiado al portapapeles!"));
        };

        const btnEliminar = document.createElement("button"); 
        btnEliminar.innerText = "X";
        Object.assign(btnEliminar.style, { 
            padding: "5px 8px", 
            backgroundColor: "#e74c3c", 
            color: "#fff", 
            border: "none", 
            borderRadius: "50%", 
            cursor: "pointer" 
        });
        btnEliminar.onclick = () => {
            contenedor.remove();
            const guardados = JSON.parse(localStorage.getItem("mensajesGuardados") || "[]").filter(m => m.nombre !== nombreBoton);
            localStorage.setItem("mensajesGuardados", JSON.stringify(guardados));
        };

        contenedor.appendChild(nuevoBoton); 
        contenedor.appendChild(btnEliminar);
        document.body.appendChild(contenedor);
    };

    // CARGAR BOTONES GUARDADOS
    const mensajesGuardados = JSON.parse(localStorage.getItem("mensajesGuardados") || "[]");
    mensajesGuardados.forEach((m, i) => crearBotonMensaje(m.nombre, m.mensaje, 70 + i * 50));

    // BOTÓN CREAR MENSAJE
    const btnCrearMensaje = document.createElement("button"); 
    btnCrearMensaje.innerText = "CREAR MENSAJE";
    Object.assign(btnCrearMensaje.style, { 
        position: "fixed", 
        bottom: "20px", 
        right: "20px", 
        zIndex: 9999, 
        padding: "10px", 
        backgroundColor: "#e74c3c", 
        color: "#fff", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer" 
    });
    btnCrearMensaje.onclick = () => {
        const nombreBoton = prompt("👉 Escribe el nombre del nuevo botón:"); 
        if (!nombreBoton) return alert("No diste nombre ❌");
        const mensajePersonalizado = prompt("👉 Escribe tu mensaje personalizado:"); 
        if (!mensajePersonalizado) return alert("No escribiste mensaje ❌");

        const botonesExistentes = document.querySelectorAll(".btn-contenedor");
        const bottomPos = 70 + botonesExistentes.length * 50;

        crearBotonMensaje(nombreBoton, mensajePersonalizado, bottomPos);

        const guardados = JSON.parse(localStorage.getItem("mensajesGuardados") || "[]");
        guardados.push({ nombre: nombreBoton, mensaje: mensajePersonalizado });
        localStorage.setItem("mensajesGuardados", JSON.stringify(guardados));
    };
    document.body.appendChild(btnCrearMensaje);

    // BOTÓN IMPORTAR CONTACTOS
    const btnImportContacts = document.createElement("button");
    btnImportContacts.innerText = "📥 Importar Contactos";
    Object.assign(btnImportContacts.style, {
        position: "fixed",
        bottom: "10px",
        left: "10px",
        zIndex: 9999,
        padding: "10px 15px",
        backgroundColor: "#1abc9c",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
    });

    btnImportContacts.onclick = () => {
        const pastedData = prompt("📋 Pega aquí los contactos en formato:\nNombre<TAB>Teléfono");
        if (!pastedData) return alert("❌ No pegaste datos");

        const contactos = pastedData.split("\n").map(line => {
            const [nombre, telefono] = line.split("\t");
            let num = telefono?.trim() || "";

            num = num.replace(/\D/g, "");
            if (num.length === 10) {
                num = "+52" + num;
            } else if (num.startsWith("52") && num.length === 12) {
                num = "+" + num;
            } else if (!num.startsWith("+")) {
                num = "+52" + num;
            }

            return {
                nombre: nombre?.trim() || "",
                telefono: num
            };
        }).filter(c => c.nombre && c.telefono);

        if (contactos.length === 0) return alert("❌ No se encontraron contactos válidos");

        const texto = contactos.map(c => `${c.nombre}\t${c.telefono}`).join("\n");
        navigator.clipboard.writeText(texto);

        let csv = "Name,Given Name,Phone 1 - Type,Phone 1 - Value\n";
        contactos.forEach(c => {
            csv += `"${c.nombre}","${c.nombre}","Mobile","${c.telefono}"\n`;
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contactos_google_mexico.csv";
        a.click();
        URL.revokeObjectURL(url);

        alert(`✅ ${contactos.length} contactos listos.\nSe copió al portapapeles y se descargó el CSV para Google Contacts.`);
    };

    document.body.appendChild(btnImportContacts);
}

// =======================================
// EJECUCIÓN DIRECTA (SIN LOGIN)
// =======================================
iniciarAddon();