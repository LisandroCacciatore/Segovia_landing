# Flujos de n8n — Estudio Segovia (demo)

Respaldo de los flujos que atienden el formulario de la landing. Nada de esto
reemplaza al n8n: son los JSON para poder reimportarlos si la instancia se
recrea o se migra a la propia del estudio.

## Por qué existe este directorio

La instancia actual corre en un contenedor **sin volumen persistente**. Si el
contenedor se recrea, se pierden los flujos y las credenciales. El JSON no
reemplaza las credenciales (no viajan), pero sí los flujos.

## Archivos

| Archivo | Qué es |
|---|---|
| `consultas-web.workflow.json` | Recibe el POST del formulario, valida, responde y registra en la planilla + avisa por correo |
| `errores.workflow.json` | Se dispara cuando otro flujo falla y manda un correo con el detalle |

## Antes de importar: reemplazar los marcadores

Los archivos van **sanitizados**: no tienen el correo personal ni el id de la
planilla.

| Marcador | Reemplazar por |
|---|---|
| `CORREO_DEL_ESTUDIO` | La casilla que debe recibir los avisos |
| `ID_DE_LA_PLANILLA` | El id del documento de Google Sheets (está en la URL) |

Después de importar, en cada nodo de Google hay que **asignar la credencial**
(no viaja en el JSON).

## Cómo importar

Desde la interfaz: *Workflows → Import from file*.

Por consola, dentro del contenedor:

```bash
n8n import:workflow --input=/tmp/consultas-web.workflow.json
n8n import:workflow --input=/tmp/errores.workflow.json
```

## Activar el aviso de errores (2 pasos que no se pueden automatizar)

1. Abrir **Errores - Consultas web** → nodo *Avisar por correo* → elegir la
   credencial de Gmail → guardar.
2. Abrir **Consultas web - Estudio Segovia** → *Settings* → **Error Workflow**
   → elegir *Errores - Consultas web*.

Sin el paso 2, el flujo de errores existe pero nunca se dispara.

## Sobre la autorización de Google

La app de Google está en modo **Testing**: la autorización vence cada **7
días**. Cuando la planilla o el correo dejen de funcionar, es eso. Con el flujo
de errores activo, al menos llega un aviso en lugar de fallar en silencio.

Los nodos de Sheets y Gmail están configurados para **seguir ante errores**
(`continueRegularOutput`): el visitante recibe su confirmación aunque el
registro falle. Por eso el aviso de errores es importante.

## Lo que este respaldo no resuelve

- **Las credenciales**: se recrean con la cuenta que corresponda.
- **El volumen**: si la instancia no tiene volumen, cualquier recreación vuelve
  a necesitar esta importación.
- **El puerto 5678 abierto a internet**: es configuración del servidor, no del
  flujo.

## Antes de activar el flujo de errores

Dos cosas que, si faltan, hacen que el flujo **falle en silencio**:

1. **Destinatario real.** En `errores.workflow.json` el campo `sendTo` viene como
   `CORREO_DEL_ESTUDIO`. Si se importa tal cual, Gmail lo rechaza con
   `Invalid email address` y el aviso nunca llega. Hay que poner el correo del
   estudio al importar.
2. **Credencial de Gmail.** El nodo viene sin credencial: se asigna desde el
   editor, y conviene reutilizar la misma que ya usa el nodo "Avisar al estudio".

Y el flujo tiene que quedar **activo**: n8n no ejecuta un error workflow
inactivo; el error que se ve es
`Workflow "<id>" is not active and cannot be executed`.
