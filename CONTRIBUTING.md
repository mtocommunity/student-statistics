# 📚 Cómo Contribuir

¡Gracias por tu interés en mejorar este proyecto! Si tienes ideas, correcciones
o nuevas funcionalidades, puedes contribuir de la siguiente manera:

1. Fork este repositorio.
2. Crea una rama descriptiva para tu cambio:
   `git checkout -b feature/nombre-descriptivo`.
3. Realiza tus cambios en esa rama, asegurándote de seguir las guías de estilo y
   pruebas existentes.
4. Commit de tus cambios con mensajes claros:
   `git commit -m "feat: descripción de la mejora"`.
5. Push de la rama a tu repositorio remoto:
   `git push origin feature/nombre-descriptivo`.
6. Abre un Pull Request en este repositorio, detallando:
   - Qué problema resuelve o qué mejora introduce.
   - Capturas de pantalla o ejemplos (si aplican).
   - Pasos para probar tu aporte.

También puedes crear un Issue si encuentras un error, tienes una pregunta o
quieres proponer una idea. Sé lo más detallado posible para facilitar la
revisión.

## 🚀 Ejecutar el Proyecto

Este proyecto utiliza JavaScript/TypeScript con [Bun](https://bun.sh) como
runtime y gestor de paquetes. Es requisito instalarlo antes de comenzar.

> [!TIP]
>
> Asegúrate de ajustar variables de entorno según sea necesario. Revisa el
> archivo [`.env.example`](.env.example) para ver las variables requeridas.

### 🛠️ Modo Desarrollo

En modo desarrollo, podrás iniciar un servidor con recarga automática de
cambios:

```bash
bun install     # Instala dependencias (sólo la primera vez)
bun run dev     # Inicia en modo desarrollo
```

> [!NOTE]
>
> Si modificas los schemas de la base de datos, regenera y aplica las
> migraciones:
>
> ```bash
> bun run db:push
> ```

### 🏭 Modo Producción

Para compilar y ejecutar en un entorno de producción optimizado:

```bash
bun run build && bun run start
```

Este comando:

- Transpila y empaqueta el código.
- Inicia la aplicación en el puerto configurado.

## 🐳 Uso de Docker

En la raíz del proyecto encontrarás un `Dockerfile` para construir una imagen
ligera:

```bash
# Construir la imagen
docker build -t nombre-del-proyecto:latest .

# Ejecutar el contenedor
docker run -d -p 4321:4321 nombre-del-proyecto:latest
```

---

¡Esperamos tus contribuciones y sugerencias para hacer este proyecto aún mejor!
