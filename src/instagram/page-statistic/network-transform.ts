export class NetworkTransform {
  private readonly data!: any;
  constructor(data: any) { this.data = data}

  get postsCount() {
    return this.data?.count || null;
  }

  get avgLikes() {
    const likesArray = this.data?.edges?.map(el => el?.node?.edge_media_preview_like?.count || 0) || [];
    const sum = likesArray.reduce((a, b) => a + b, 0);
    return sum/likesArray.length || null;
  }

  get avgComments() {
    const commentsArray = this.data?.edges?.map(el => el?.node?.edge_media_to_comment?.count || 0) || [];
    const sum = commentsArray.reduce((a, b) => a + b, 0);
    return sum/commentsArray.length || null;
  }

  get tagsDescription() {
    const tags = [];
    this.data?.edges?.map(el => {
      el?.node?.edge_media_to_caption?.edges?.map(elem => {
        const matchedTags = elem.node?.text.match(/#[а-яА-ЯёЁa-zA-Z]*/gi);
        if (Array.isArray(matchedTags)) tags.push(...matchedTags);
      })
    })
    return tags.filter(el => el).join(', ');
  }

  get taggedUsersDescription() {
    const tags = [];
    this.data?.edges?.map(el => {
      el?.node?.edge_media_to_caption?.edges?.map(elem => {
        const matchedTags = elem.node?.text.match(/@[а-яА-ЯёЁa-zA-Z]*/gi);
        if (Array.isArray(matchedTags)) tags.push(...matchedTags);
      })
    })
    return tags.filter(el => el).join(', ');
  }

  get taggedUsers() {
    const tags = [];
    this.data?.edges?.map(el => {
      el?.node?.edge_media_to_tagged_user?.edges?.map(elem => {
        tags.push('@'.concat(elem.node?.user?.username));
      })
    })
    return tags.filter(el => el).join(', ');
  }
}