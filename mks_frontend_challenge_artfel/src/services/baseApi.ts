export class BaseAPI {
  private baseApi = process.env.NEXT_PUBLIC_URL_API + "/api";

  async get<T>(): Promise<T | undefined> {
    try {
      const res = await fetch(
        `${this.baseApi}/v1/products?page=1&rows=10&sortBy=id&orderBy=ASC`
      );
      const data = await res.json();

      return data;
    } catch (e) {
      console.error("OPS!: ", e);
      throw new Error();
    }
  }
}
