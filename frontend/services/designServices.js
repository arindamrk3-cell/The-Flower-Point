import API from "./api";

export const getAllDesigns = async () => {
    const response = await API.get("/designs");
    return response.data;
};

export const getDesignsByCategory=async(category)=>{
    const response=await API.get(`/designs?category=${category}`);
    return response.data;
}

export const getDesignById = async (id) => {
    const response = await API.get(`/designs/${id}`);
    return response.data;
};


export const createDesign = async (formData) => {
   for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    const response = await API.post("/designs", formData, 
        {
            headers:{
                "Content-Type":"multipart/form-data",
            },
        }
    );
    return response.data;
};
export const addPhotos = async(id,images)=>{

    const formData=new FormData();

    images.forEach(image=>{

        formData.append("images",image);

    });

    const response=await API.put(

        `/designs/${id}/photos`,

        formData,

        {

            headers:{

                "Content-Type":"multipart/form-data"

            }

        }

    );

    return response.data;

};
export const deletePhoto = async (id, imageUrl) => {
  const response = await API.delete(
    `/designs/${id}/photo`,
    {
      data: {
        imageUrl,
      },
    }
  );

  return response.data;
};
export const setCoverImage = async(id,image)=>{

    const response = await API.put(

        `/designs/${id}/cover`,

        {

            image

        }

    );

    return response.data;

};
export const updateDesign = async (id, design) => {
    const response = await API.put(`/designs/${id}`, design);
    return response.data;
};

export const deleteDesign = async (id) => {
    const response = await API.delete(`/designs/${id}`);
    return response.data;
};