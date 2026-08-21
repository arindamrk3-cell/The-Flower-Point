import API from "../../../services/api";

export const getAllInquiries = async () => {
    const response = await API.get("/inquiries");
    return response.data;
};
export const updateInquiry = async (id, data) => {

    const response = await API.put(

        `/inquiries/${id}`,

        data

    );

    return response.data;

};
export const deleteInquiry = async (id) => {
    const response = await API.delete(`/inquiries/${id}`);
    return response.data;
};
export const createInquiry = async (data) => {
    const response = await API.post("/inquiries", data);
    return response.data;
};