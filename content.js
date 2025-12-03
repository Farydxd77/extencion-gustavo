//////////////////////////////////////////////////////////////////////////////////////////////
// ADDON COMPLETO CON LOGIN EN CACHE (persistente), SOPORTE, EXPORTAR CLIENTE, CREAR MENSAJE Y CERRAR SESIÓN
//////////////////////////////////////////////////////////////////////////////////////////////

// =======================================
// FUNCIONES DE LOGIN
// =======================================
async function obtenerUsuarios() {
    const sheetId = "1q27x8brVVUnpyd6pP1OMiNLQm-pOBpjerDPVI8LQhlk";
    const sheetGid = "0";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${sheetGid}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo obtener datos de la hoja de Google Sheets");

    const text = await response.text();
    const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const data = JSON.parse(jsonText);

    const usuarios = {};
    data.table.rows.forEach(row => {
        const usuario = row.c[0]?.v?.toString().trim();
        const contrasena = row.c[1]?.v?.toString().trim();
        if (usuario && contrasena) usuarios[usuario] = contrasena;
    });
    return usuarios;
}

async function mostrarLogin() {
    const usuarios = await obtenerUsuarios();

    return new Promise((resolve) => {
        // Revisamos si ya hay sesión guardada en localStorage
        const usuarioCache = localStorage.getItem("usuarioLogueado");
        if (usuarioCache && usuarios[usuarioCache]) {
            return resolve(true);
        }

        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 99999
        });

        const container = document.createElement('div');
        Object.assign(container.style, {
            backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
            display: 'flex', flexDirection: 'column', gap: '15px', width: '300px', textAlign: 'center'
        });

        const title = document.createElement('h2'); title.innerText = 'Login'; container.appendChild(title);

        const inputUsuario = document.createElement('input'); inputUsuario.placeholder = 'Usuario';
        Object.assign(inputUsuario.style, { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' });
        container.appendChild(inputUsuario);

        const inputPassword = document.createElement('input'); inputPassword.placeholder = 'Contraseña'; inputPassword.type = 'password';
        Object.assign(inputPassword.style, { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' });
        container.appendChild(inputPassword);

        const btnLogin = document.createElement('button'); btnLogin.innerText = 'Ingresar';
        Object.assign(btnLogin.style, {
            padding: '10px', borderRadius: '5px', border: 'none',
            backgroundColor: '#3498db', color: '#fff', cursor: 'pointer'
        });
        container.appendChild(btnLogin);

        const msgError = document.createElement('div'); msgError.style.color = 'red'; container.appendChild(msgError);

        btnLogin.onclick = () => {
            const usuario = inputUsuario.value.trim();
            const password = inputPassword.value.trim();
            if (!usuario || !password) { msgError.innerText = '❌ Debes llenar ambos campos'; return; }

            if (usuarios[usuario] && usuarios[usuario] === password) {
                localStorage.setItem("usuarioLogueado", usuario); // Guardamos login persistente
                alert('✅ Bienvenido ' + usuario);
                overlay.remove();
                resolve(true);
            } else msgError.innerText = '❌ Usuario o contraseña incorrectos';
        };

        overlay.appendChild(container);
        document.body.appendChild(overlay);
    });
}

// =======================================
// FUNCIONES ADDON (SOPORTE, EXPORTAR, CREAR MENSAJE, CERRAR SESIÓN)
// =======================================
async function iniciarAddon() {
    if (!window.location.href.startsWith("https://crm.cashimex.mx/#/detail")) return;

    const getTextAfterLabel = (label) => {
        return [...document.querySelectorAll("div.mb-10")]
            .find(el => el.innerText.trim().startsWith(label))
            ?.innerText.split(":").slice(1).join(":").trim() || "";
    };

    // BOTÓN SOPORTE
    const btnSoporte = document.createElement("button"); btnSoporte.innerText = "SOPORTE";
    Object.assign(btnSoporte.style, { position: "fixed", top: "60px", right: "20px", zIndex: 9999, padding: "10px", backgroundColor: "#2ecc71", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" });
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

    // BOTÓN EXPORTAR CLIENTE
    const btnExportarCliente = document.createElement("button"); btnExportarCliente.innerText = "Exportar Cliente";
    Object.assign(btnExportarCliente.style, { position: "fixed", top: "20px", right: "20px", zIndex: 9999, padding: "10px", backgroundColor: "#3498db", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" });
    btnExportarCliente.onclick = () => {
        const idPlan = getTextAfterLabel("ID Plan de pago");
        const nombre = getTextAfterLabel("Nombre");
        const app = document.querySelector("span.el-tooltip")?.innerText.trim() || "";
        const producto = getTextAfterLabel("Nombre del producto");
        const monto = getTextAfterLabel("Monto del contrato");
        const correo = getTextAfterLabel("Correo electrónico");
        const telefono = getTextAfterLabel("Teléfono");
        const imagen = document.querySelector("img.image")?.src || "";
        const ref1 = getTextAfterLabel("Padre/Madre");
        const ref2 = getTextAfterLabel("Hermano/Hermana");

        const texto = [idPlan, nombre, app, producto, monto, correo, telefono, imagen, ref1, ref2].join("\t");
        navigator.clipboard.writeText(texto).then(() => alert("Datos del cliente copiados para Excel ✅"));
    };
    document.body.appendChild(btnExportarCliente);

    // BOTÓN CERRAR SESIÓN
    const btnCerrarSesion = document.createElement("button"); btnCerrarSesion.innerText = "CERRAR SESIÓN";
    Object.assign(btnCerrarSesion.style, { position: "fixed", top: "100px", right: "20px", zIndex: 9999, padding: "10px", backgroundColor: "#f39c12", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" });
    btnCerrarSesion.onclick = () => {
        if (confirm("¿Deseas cerrar sesión?")) {
            localStorage.removeItem("usuarioLogueado");
            location.reload();
        }
    };
    document.body.appendChild(btnCerrarSesion);

    // CREAR MENSAJES
    const crearBotonMensaje = (nombreBoton, mensajePersonalizado, bottomPos) => {
        const contenedor = document.createElement("div");
        contenedor.style.position = "fixed"; contenedor.style.right = "20px";
        contenedor.style.zIndex = 9999; contenedor.style.display = "flex";
        contenedor.style.alignItems = "center"; contenedor.style.gap = "5px";
        contenedor.style.bottom = `${bottomPos}px`; contenedor.classList.add("btn-contenedor");

        const nuevoBoton = document.createElement("button"); nuevoBoton.innerText = nombreBoton;
        Object.assign(nuevoBoton.style, { padding: "10px", backgroundColor: "#3498db", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" });
        nuevoBoton.onclick = () => {
            const producto = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.includes("Nombre del producto:"))?.innerText.split(":")[1].trim() || "No encontrado";
            const monto = [...document.querySelectorAll("div.mb-10")].find(el => el.innerText.includes("Monto del contrato:"))?.innerText.split(":")[1].trim() || "No encontrado";
            const mensajeFinal = `${mensajePersonalizado}\n\nNombre del producto: ${producto}\nMonto del contrato: ${monto}`;
            navigator.clipboard.writeText(mensajeFinal).then(() => alert("✅ Mensaje copiado al portapapeles!"));
        };

        const btnEliminar = document.createElement("button"); btnEliminar.innerText = "X";
        Object.assign(btnEliminar.style, { padding: "5px 8px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: "50%", cursor: "pointer" });
        btnEliminar.onclick = () => {
            contenedor.remove();
            const guardados = JSON.parse(localStorage.getItem("mensajesGuardados") || "[]").filter(m => m.nombre !== nombreBoton);
            localStorage.setItem("mensajesGuardados", JSON.stringify(guardados));
        };

        contenedor.appendChild(nuevoBoton); contenedor.appendChild(btnEliminar);
        document.body.appendChild(contenedor);
    };

    // CARGAR BOTONES GUARDADOS
    const mensajesGuardados = JSON.parse(localStorage.getItem("mensajesGuardados") || "[]");
    mensajesGuardados.forEach((m, i) => crearBotonMensaje(m.nombre, m.mensaje, 20 + i * 50));

    // BOTÓN CREAR MENSAJE
    const btnDeudor1 = document.createElement("button"); btnDeudor1.innerText = "CREAR MENSAJE";
    Object.assign(btnDeudor1.style, { position: "fixed", bottom: "20px", right: "20px", zIndex: 9999, padding: "10px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" });
    btnDeudor1.onclick = () => {
        const nombreBoton = prompt("👉 Escribe el nombre del nuevo botón:"); if (!nombreBoton) return alert("No diste nombre ❌");
        const mensajePersonalizado = prompt("👉 Escribe tu mensaje personalizado:"); if (!mensajePersonalizado) return alert("No escribiste mensaje ❌");

        const botonesExistentes = document.querySelectorAll(".btn-contenedor");
        const bottomPos = 20 + botonesExistentes.length * 50;

        crearBotonMensaje(nombreBoton, mensajePersonalizado, bottomPos);

        const guardados = JSON.parse(localStorage.getItem("mensajesGuardados") || "[]");
        guardados.push({ nombre: nombreBoton, mensaje: mensajePersonalizado });
        localStorage.setItem("mensajesGuardados", JSON.stringify(guardados));
    };
    document.body.appendChild(btnDeudor1);
/// === BOTÓN IMPORTAR CONTACTOS (con CSV para Google Contacts México) ===
const btnImportContacts = document.createElement("button");
btnImportContacts.innerText = "📥 Importar Contactos";
Object.assign(btnImportContacts.style, {
    position: "fixed",
    bottom: "10px",
    left: "10px", // 👉 parte inferior izquierda
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

        // Normalizar a formato México (+52)
        num = num.replace(/\D/g, ""); // quitar todo menos dígitos
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

    // --- Copiar al portapapeles en formato simple ---
    const texto = contactos.map(c => `${c.nombre}\t${c.telefono}`).join("\n");
    navigator.clipboard.writeText(texto);

    // --- Generar CSV Google Contacts ---
    let csv = "Name,Given Name,Phone 1 - Type,Phone 1 - Value\n";
    contactos.forEach(c => {
        csv += `"${c.nombre}","${c.nombre}","Mobile","${c.telefono}"\n`;
    });

    // --- Descargar CSV ---
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
// EJECUCIÓN
// =======================================
(async () => {
    try {
        await mostrarLogin();   // Solo pide login si no hay sesión guardada
        await iniciarAddon();   // Ejecuta addon
    } catch (err) {
        console.error("Addon error:", err.message);
    }
})();
