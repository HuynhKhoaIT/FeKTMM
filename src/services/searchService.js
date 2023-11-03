import * as httprequest from '../utils/httprequest';

export const search = async (q) => {
    try {
        const res = await httprequest.get(`searchs`, {
            params: {
                q,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
