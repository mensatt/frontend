

export namespace EntityReview {

  export const mutationAdd = gql`
  mutation addReview(
    $occId: UUID!,
    $author: String,
    $images: [UUID!],
    $stars: Int!,
    $comment: String
  ) {
    createReview(
      input: {
        occurrence: $occId,
        displayName: $author,
        images: $images,
        stars: $stars,
        text: $comment
      }
    ) {
      id
    }
  }`

  export type AddVariables = {
    stars: number
    occId: string
    author: string | null
    comment: string | null
    images?: string[]
  }

}
