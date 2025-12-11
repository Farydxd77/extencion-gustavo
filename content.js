//////////////////////////////////////////////////////////////////////////////////////////////
// ADDON COMPLETO SIN LOGIN - SOPORTE, EXPORTAR CLIENTE, WAP, WAP2, CREAR MENSAJE
//////////////////////////////////////////////////////////////////////////////////////////////
// bit.ly/TodoCredito
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


    
    
    

// PRIMER-CONTACTO
const btnWAP2 = document.createElement("button"); 
btnWAP2.innerText = "PRIMER-CONTACTO";
Object.assign(btnWAP2.style, { 
    position: "fixed", 
    top: "140px", 
    right: "20px", 
    zIndex: 9999, 
    padding: "10px", 
    backgroundColor: "#008000", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
});
btnWAP2.onclick = () => {
    const nombre = getTextAfterLabel("Nombre");
    const producto = getTextAfterLabel("Nombre del producto");
    const pagoCompletoFactura = getTextAfterLabel("Pago completo de la factura");
    const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";

    // Generar el link basado en el nombre de la APP
    const linkApp = "bit.ly/" + app.replace(/\s+/g, "");

    const mensaje = `Hola *${nombre}* , soy de la APPS *${app}* ${linkApp} 👋.

Te escribimos para recordarte sobre un producto pendiente con la FINANCIERA. El pago de tu producto *${producto}* por *${pagoCompletoFactura}* estaba programado para ayer y hoy se encuentra vencido.
Te invitamos a concluir con *TODOS SUS PAGOS COMPLETOS* hoy mismo a través de la APPS FINANCIERA (o en ${linkApp}) para mantener tu buen historial y acceder a beneficios exclusivos 🎁:

--Préstamos más altos al instante: Desbloquea montos hasta $30,000,000 pesos.
-Cupones de Descuento
*-⚠️ Importante: Si el pago no se refleja durante la mañana de hoy, lamentablemente:*
-Tu historial crediticio podría verse afectado negativamente ante las entidades reguladoras (SIC, CNBV, NBFC).
-El caso será transferido a nuestro departamento de cobranza externa para seguimiento rígido.`;

    navigator.clipboard.writeText(mensaje).then(() => alert("✅ Mensaje WAP2 copiado!"));
};
document.body.appendChild(btnWAP2);


// BOTÓN CONT-WAP
const btnContWap = document.createElement("button"); 
btnContWap.innerText = "CONT-WAP";
Object.assign(btnContWap.style, { 
    position: "fixed", 
    top: "180px", 
    right: "20px", 
    zIndex: 9999, 
    padding: "10px", 
  
backgroundColor: "#F7DC6F",
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
});
btnContWap.onclick = () => {
    const nombre = getTextAfterLabel("Nombre");
    const producto = getTextAfterLabel("Nombre del producto");
    const pagoCompletoFactura = getTextAfterLabel("Pago completo de la factura");
    const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";
    const importeDiv = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.trim().startsWith("Importe de la factura de reinversión"));
    const importe = importeDiv?.querySelector("span[style*='color: green'], span[style*='color: red']")?.textContent.trim() || "";

    const linkApp = "bit.ly/" + app.replace(/\s+/g, "");

    const mensaje = `Hola, estimada *${nombre}* :

Exigimos el *pago inmediato* o, a más tardar, a las *8:00 a.m.* Una transferencia no demora más de dos minutos.

Si no recibimos respuesta, nuestros asesores de zona se pondrán en contacto con usted mediante llamadas y mensajes, así como con sus familiares y amigos.

🚫 Evite que esta situación afecte sus relaciones personales y laborales.

📢 Ignorar solo hará que sigamos insistiendo.

APP: ${app} ${linkApp}

Nombre del producto: *${producto}* (${pagoCompletoFactura}) o prórroga (${importe})`;

    navigator.clipboard.writeText(mensaje).then(() => alert("✅ Mensaje CONT-WAP copiado!"));
};
document.body.appendChild(btnContWap);


// BOTÓN CONT-WAP2
const btnContWap2 = document.createElement("button"); 
btnContWap2.innerText = "CONT-WAP2";
Object.assign(btnContWap2.style, { 
    position: "fixed", 
    top: "220px", 
    right: "20px", 
    zIndex: 9999, 
    padding: "10px", 
    backgroundColor: "#FF9900",
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
});
btnContWap2.onclick = () => {
    const nombre = getTextAfterLabel("Nombre");
    const producto = getTextAfterLabel("Nombre del producto");
    const pagoCompletoFactura = getTextAfterLabel("Pago completo de la factura");
    const importeFacturaReinversion = getTextAfterLabel("Importe de la factura de reinversión");
    const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";

    const linkApp = "bit.ly/" + app.replace(/\s+/g, "");

    const mensaje = `Hola *${nombre}* ,

Soy de la APPS *${app}* ${linkApp}.

Le recordamos que el pago de su producto *${producto}* por *${pagoCompletoFactura}* pesos o prorroga *${importeFacturaReinversion}* venció AYER y está generando cargos moratorios. Su cuenta se encuentra en estado de mora crítico.

⚠️ ÚLTIMO AVISO ANTES DE ACCIONES RIGUROSAS:

HOY es el plazo final para evitar que su caso sea transferido sin excepción a nuestro DEPARTAMENTO DE COBRANZA EXTERNA para un seguimiento rígido.

El NO pago en las próximas horas resultará en un REPORTE NEGATIVO INMEDIATO ante las entidades reguladoras (SIC, CNBV, NBFC), afectando su historial crediticio de manera GRAVE y duradera.`;

    navigator.clipboard.writeText(mensaje).then(() => alert("✅ Mensaje CONT-WAP2 copiado!"));
};
document.body.appendChild(btnContWap2);

// BOTÓN CONT-WAP3
const btnContWap3 = document.createElement("button"); 
btnContWap3.innerText = "CONT-WAP3";
Object.assign(btnContWap3.style, { 
    position: "fixed", 
    top: "260px", 
    right: "20px", 
    zIndex: 9999, 
    padding: "10px", 
    backgroundColor: "#c0392b", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
});
btnContWap3.onclick = () => {
    const nombre = getTextAfterLabel("Nombre");
    const producto = getTextAfterLabel("Nombre del producto");
    const pagoCompletoFactura = getTextAfterLabel("Pago completo de la factura");
    const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";
    const importeFacturaReinversion = getTextAfterLabel("Importe de la factura de reinversión");

    const linkApp = "bit.ly/" + app.replace(/\s+/g, "");

    const mensaje = `*${producto}* Vencido. Evite un Daño Crediticio PERMANENTE.

Estimado *${nombre}* ,

Le contactamos de APPS *${app}* (${linkApp}) sobre el incumplimiento de su pago. Su producto *${producto}* por *${pagoCompletoFactura}* o prorroga *${importeFacturaReinversion}* pesos ha VENCIDO desde ayer.

⚠️ CONSECUENCIAS INMEDIATAS POR FALTA DE PAGO:

El plazo de cortesía ha expirado. Si su pago no se registra HOY EN LA MAÑANA, se iniciará el proceso de sanción más severo.

Su perfil será marcado como de ALTO RIESGO ante (SIC, CNBV, NBFC). La afectación a su buró de crédito comenzará hoy.

Dejaremos de gestionar esta cuenta y será ASIGNADA a una agencia de cobranza externa, AUMENTANDO EL COSTO Y LA PRESIÓN de la deuda.

La ÚNICA solución es el PAGO TOTAL Y URGENTE. No arriesgue su capacidad crediticia futura por este monto.`;

    navigator.clipboard.writeText(mensaje).then(() => alert("✅ Mensaje CONT-WAP3 copiado!"));
};
document.body.appendChild(btnContWap3);







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

   
}
// =======================================
// EJECUCIÓN DIRECTA (SIN LOGIN)
// =======================================
iniciarAddon();