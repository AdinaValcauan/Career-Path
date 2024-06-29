import api from "./axiosConfig";

export const addSubtitleService = async (dayId, subtitleText, orderForm) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.post(
      "/addSubtitle",
      {
        subtitleText,
        orderForm,
        dayId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      return { success: true, error: null };
    }
  } catch (error) {
    return { success: false, error: "Failed to add the subtitle" };
  }
};

export const deleteSubtitleService = async (subtitleId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.delete(`/deleteSubtitle/${subtitleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true, error: null };
    }
  } catch (error) {
    return { success: false, error: "Failed to delete the title" };
  }
};

export const updateSubtitleService = async (updatedSubtitle) => {
  try {
    const token = sessionStorage.getItem("token");

    let subtitleId = updatedSubtitle.subtitleId;
    let subtitleText = updatedSubtitle.subtitleText;
    let dayId = updatedSubtitle.dayId;
    let orderForm = updatedSubtitle.orderForm;

    const subtitle = { subtitleId, subtitleText, orderForm, dayId };

    const response = await api.put(
      `/updateSubtitle/${subtitle.subtitleId}`,
      subtitle,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      return { success: true, error: null };
    }
  } catch (error) {
    throw error;
  }
};

export const getSubtitlesByDayService = async (dayId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.get(`/getSubtitlesByDay/${dayId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error fetching subtitles", error);
    throw error;
  }
};
