import backendApi from "../../../apis/backend";

export default function useSearch() {
	async function searchKeywords(word) {
		const response = await backendApi().get(
			`/elastic/search/keywords?kw=${word}`
		);

		return response.data;
	}

	async function searchAuthors(word) {
		const response = await backendApi().get(
			`/elastic/search/authors?author=${word}`
		);

		return response.data;
	}

	async function searchArticles(keywordsFiltered, authorsFiltered, matchAll) {
		const response = await backendApi().get(
			`/elastic/search/articles?keywords=${encodeURIComponent(
				keywordsFiltered
			)}&authors=${encodeURIComponent(authorsFiltered)}&matchAll=${matchAll}`
		);

		return response.data;
	}

	return {
		searchKeywords,
		searchArticles,
		searchAuthors,
	};
}
