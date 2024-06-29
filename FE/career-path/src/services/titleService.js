import api from "./axiosConfig";

export const addTitleService = async (dayId, titleText, orderForm) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.post(
      "/addTitle",
      {
        titleText,
        orderForm,
        dayId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      return { success: "Succes", error: null };
    }
  } catch (error) {
    return { success: false, error: "Failed to add the title" };
  }
};

export const deleteTitleService = async (titleId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.delete(`/deleteTitle/${titleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true, error: null };
    }
  } catch (error) {
    return { success: false, error: "Failed to delete the title" };
  }
};

export const updateTitleService = async (updatedTitle) => {
  try {
    const token = sessionStorage.getItem("token");

    let titleId = updatedTitle.titleId;
    let titleText = updatedTitle.titleText;
    let orderForm = updatedTitle.orderForm;
    let dayId = updatedTitle.dayId;

    const title = { titleId, titleText, orderForm, dayId };

    const response = await api.put(`/updateTitle/${title.titleId}`, title, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true, error: null };
    }
  } catch (error) {
    throw error;
  }
};

export const getTitlesByDayService = async (dayId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.get(`/getTitlesByDay/${dayId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error fetching titles", error);
    throw error;
  }
};
