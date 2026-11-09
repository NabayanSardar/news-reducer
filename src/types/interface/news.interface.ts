export interface News {
     _id: string,
      title: string,
      slug: string,
      content: string,
      category: {
        _id: string,
        name: string,
        slug: string
      },
      image: {
        url: string,
        public_id : string
      },
      author: string,
      isPublished: true,
      publishedAt: string,
      createdAt: string,
      updatedAt: string
}

export interface ArticlePaylod {
     title: string,
      content: string,
      category : string;
      image?: File | null
}