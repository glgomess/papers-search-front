import backendApi from "../../../apis/backend";

export default function useSearch() {
	async function searchKeywords(word) {
		const response = await backendApi().get(
			`/elastic/search/keywords?kw=${word}`
		);

		return response.data;
	}

	async function searchArticles(filters) {
		const response = await backendApi().get(
			`/elastic/search/articles?keywords=${encodeURIComponent(filters)}`
		);

		return response.data;
	}

	return {
		searchKeywords,
		searchArticles,
	};
}
