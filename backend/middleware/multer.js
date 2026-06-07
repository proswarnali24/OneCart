import multer from 'multer'
import path from 'path'

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null,`${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
});
 let upload = multer({storage})

 export default upload
