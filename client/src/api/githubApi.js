import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getGithubUser = async (
    username,
    sort = "updated",
    page = 1,
    limit = 10
) => {

    const response = await axios.get(
        `${BASE_URL}/${username}`,
        {
            params: {
                sort,
                page,
                limit
            }
        }
    );

    return response.data;
};