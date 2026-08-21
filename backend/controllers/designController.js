const Design = require("../models/Design");
const cloudinary = require("../config/cloudinary");
// Create New Design

const createDesign = async (req, res) => {
  try {
    console.log("BODY:", req.body);
console.log("FILES:", req.files);
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // console.log(file.originalname);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "flower-point",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
    }

    const design = await Design.create({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      flowers: JSON.parse(req.body.flowers),
      features: JSON.parse(req.body.features),
      images: imageUrls,
    });
    res.status(201).json({
      success: true,
      message: "Design created successfully",
      data: design,
    });
  } catch (error) {
  // console.error("===== ERROR =====");
  // console.error(error);
  // console.error("=================");

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

const getAllDesigns=async(req,res)=>{
  try{
    const filter={};
    if(req.query.category){
      filter.category=req.query.category;
    }
     if(req.query.search){

      filter.title = {
        $regex:req.query.search,
        $options:"i"
      };
    }
    const designs=await Design.find(filter).sort({createdAt:-1});
    res.status(200).json({
    success:true,
    count:designs.length,
    data:designs
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};
const getDesignById=async(req,res)=>{
  try{
    const design=await Design.findById(req.params.id);
    if(!design){
      return res.status(404).json({
        success:false,
        message:"Design not found",
      });
    }
    res.status(200).json({
      success:true,
      data:design,
    });
  }
  catch(error){
  res.status(500).json({
    success:false,
    message:error.message
  });
  }
  
};
const updateDesign=async(req,res)=>{
  try{
    const design=await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
        runValidators:true,
      }
    );
    if(!design){
      return res.status(404).json({
        success:false,
        message:"Design not found"
      });
    }
    res.status(200).json({
      success:true,
      message:"Design updated successfully",
      data:design,
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteDesign=async(req,res)=>{
  try{
    const design=await Design.findByIdAndDelete(req.params.id);
    if(!design){
      return res.status(404).json({
        success:false,
        message:"Design not found"
      });
    }
    res.status(200).json({
      success:true,
      message:"Design deleted successfully"
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
};
const addPhotos = async (req, res) => {

    try {

        const design = await Design.findById(req.params.id);

        if (!design) {

            return res.status(404).json({

                success:false,

                message:"Design not found"

            });

        }

        const imageUrls = [];

        for(const file of req.files){

            const result = await new Promise((resolve,reject)=>{

                const stream = cloudinary.uploader.upload_stream(

                    {

                        folder:"flower-point"

                    },

                    (error,result)=>{

                        if(error) return reject(error);

                        resolve(result);

                    }

                );

                stream.end(file.buffer);

            });

            imageUrls.push(result.secure_url);

        }

        design.images.push(...imageUrls);

        await design.save();

        res.json({

            success:true,

            message:"Photos Added",

            data:design

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};
const deletePhoto = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found",
      });
    }

    // Remove image URL from MongoDB
    design.images = design.images.filter(
      (img) => img !== imageUrl
    );

    await design.save();

    res.json({
      success: true,
      message: "Photo deleted",
      data: design,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const setCoverImage = async(req,res)=>{
    try
    { 
      const design = await Design.findByIdAndUpdate(
        req.params.id,
        {
            coverImage:req.body.image
        },
        {
            new:true
        }
      );
      if(!design){
         return res.status(404).json({
          success: false,
          message: "Design not found",
        });
      }
      res.json({
          success:true,
          data:design
      });
    }
    catch(error){
      res.status(500).json({
      success: false,
      message: error.message,
     });
    }
};
module.exports = {
  createDesign,
  getAllDesigns,
  getDesignById,
  updateDesign,
  deleteDesign,
  addPhotos,
  deletePhoto,
  setCoverImage,

};