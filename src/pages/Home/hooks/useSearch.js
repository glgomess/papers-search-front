import backendApi from "../../../apis/backend";

export default function useSearch() {
  async function searchKeywords(word) {
    try {
      const response = await backendApi().get(
        `/elastic/search/keywords?kw=${word}`
      );

      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  return {
    searchKeywords,
  };
}
