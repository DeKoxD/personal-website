import { AppBskyFeedGetAuthorFeed, AtpBaseClient } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useCallback, useEffect, useMemo, useState } from "react";
import MicroblogPost from "./MicroblogPost";
import { NavButton, NavButtonsContainer, PostList } from "./styles";

export interface MicroblogFeedProps {
  did: string;
  pageSize: number;
}

const MicroblogFeed: React.FC<MicroblogFeedProps> = ({
  did,
  pageSize = 10,
}) => {
  const client = useMemo(
    () => new AtpBaseClient("https://public.api.bsky.app"),
    []
  );

  const [posts, setPosts] = useState<PostView[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [endReached, setEndReached] = useState<boolean>(false);

  const fetchPosts = useCallback(
    async (limit: number, cursor?: string): Promise<PostView[]> => {
      return mockRes.feed.map((item) => item.post);
      const response: AppBskyFeedGetAuthorFeed.Response =
        await client.app.bsky.feed.getAuthorFeed({
          actor: did,
          cursor,
          limit,
        });
      if (!response.success) {
        // Change it
        return [];
      }
      return response.data.feed.map((item) => item.post);
    },
    [client.app.bsky.feed, did]
  );

  const loadPage = useCallback(
    async (lastCursor: string | undefined = undefined) => {
      const newPage = await fetchPosts(pageSize, lastCursor);
      if (newPage.length < pageSize) {
        setEndReached(true);
      }
      setPosts((state) => [...state, ...newPage]);
    },
    [fetchPosts, pageSize]
  );

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  function prevPage() {
    const pn = pageNumber;
    if (pn > 0) {
      const newPn = pn - 1;
      setPageNumber(newPn);
    }
  }

  async function nextPage() {
    const newPn = pageNumber + 1;
    if (newPn * pageSize <= posts.length) {
      setPageNumber(newPn);
      return;
    }

    if (endReached) {
      return;
    }

    const lastCursor = posts.at(-1)?.record?.cursor?.toString();
    loadPage(lastCursor);
    setPageNumber(newPn);
  }

  return (
    <PostList>
      <NavButtonsContainer>
        <NavButton onClick={prevPage}>{"<"}</NavButton>
        {pageNumber + 1}
        <NavButton onClick={nextPage}>{">"}</NavButton>
      </NavButtonsContainer>
      {posts
        .slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
        .map((post) => (
          <MicroblogPost key={post.cid} post={post} />
        ))}
      <NavButtonsContainer>
        <NavButton onClick={prevPage}>{"<"}</NavButton>
        <NavButton onClick={nextPage}>{">"}</NavButton>
      </NavButtonsContainer>
    </PostList>
  );
};

export default MicroblogFeed;

const mockRes: AppBskyFeedGetAuthorFeed.OutputSchema = {
  feed: [
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lsy4fwoq6s23",
        cid: "bafyreidpc24jzqt7mauspewge3ohbcojxrlcsml2iekwbct7tiwh3esdia",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-07-02T11:30:50.192Z",
          langs: ["en"],
          text: "2025 is 50% over 🫣",
        },
        replyCount: 20,
        repostCount: 24,
        likeCount: 418,
        quoteCount: 5,
        indexedAt: "2025-07-02T11:30:50.445Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lsjk7iog322t",
        cid: "bafyreigyqcfljj3trhomr4z734sb4iktp45y3gamyjhroxd3kaqk566wmi",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-06-26T16:27:50.479Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1999,
                  width: 1500,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreigzpu363ka3yynw2423kxulinx6wf6ptyphqr4wxfaf5gpjz2wpya",
                  },
                  mimeType: "image/jpeg",
                  size: 945709,
                },
              },
            ],
          },
          langs: ["en"],
          text: "I’m a simple man",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreigzpu363ka3yynw2423kxulinx6wf6ptyphqr4wxfaf5gpjz2wpya@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreigzpu363ka3yynw2423kxulinx6wf6ptyphqr4wxfaf5gpjz2wpya@jpeg",
              alt: "",
              aspectRatio: {
                height: 1999,
                width: 1500,
              },
            },
          ],
        },
        replyCount: 11,
        repostCount: 7,
        likeCount: 525,
        quoteCount: 0,
        indexedAt: "2025-06-26T16:27:54.048Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lr6vyfav5k22",
        cid: "bafyreibb6trp6kcssiqti2o53j6pthuibwuzmcr2sqrpprtcimd5aowtna",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-06-09T17:34:08.119Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1114,
                  width: 1999,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreiebfhcqm5hhdabcdssd7hg3dgpldxykydn4upvhp2xy54smk24cj4",
                  },
                  mimeType: "image/jpeg",
                  size: 582493,
                },
              },
              {
                alt: "",
                aspectRatio: {
                  height: 1118,
                  width: 2000,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreicbkb4h73y4yjku4l6gmxdaufrfr4lwhe3hmcd4a5kjxszzqukhty",
                  },
                  mimeType: "image/jpeg",
                  size: 757172,
                },
              },
            ],
          },
          langs: ["en"],
          text: "iOS 26. Adding WAY more glass",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiebfhcqm5hhdabcdssd7hg3dgpldxykydn4upvhp2xy54smk24cj4@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiebfhcqm5hhdabcdssd7hg3dgpldxykydn4upvhp2xy54smk24cj4@jpeg",
              alt: "",
              aspectRatio: {
                height: 1114,
                width: 1999,
              },
            },
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreicbkb4h73y4yjku4l6gmxdaufrfr4lwhe3hmcd4a5kjxszzqukhty@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreicbkb4h73y4yjku4l6gmxdaufrfr4lwhe3hmcd4a5kjxszzqukhty@jpeg",
              alt: "",
              aspectRatio: {
                height: 1118,
                width: 2000,
              },
            },
          ],
        },
        replyCount: 49,
        repostCount: 33,
        likeCount: 555,
        quoteCount: 63,
        indexedAt: "2025-06-09T17:34:15.360Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lqcpi7nlys2s",
        cid: "bafyreiembkihpr2tzrkxap3ubfkpphmyivgt47ptsa5zdoubvgej3yzuze",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-05-29T12:23:10.296Z",
          embed: {
            $type: "app.bsky.embed.external",
            external: {
              description:
                'Major news on the airline front: United Airlines and JetBlue will partner in a new alliance called "Blue Sky."',
              thumb: {
                $type: "blob",
                ref: {
                  $link:
                    "bafkreigyuia4essey6h7jol22uv4zxl7vuifcjfbx4bnrjx36v22cksaqq",
                },
                mimeType: "image/jpeg",
                size: 941459,
              },
              title:
                "United Airlines and JetBlue to team up in new, blockbuster partnership - The Points Guy",
              uri: "https://thepointsguy.com/news/united-airlines-jetblue-partnership/",
            },
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://thepointsguy.com/news/united-airlines-jetblue-partnership/",
                },
              ],
              index: {
                byteEnd: 165,
                byteStart: 133,
              },
            },
          ],
          langs: ["en"],
          text: "United and JetBlue will allow members to combine points and use them across either airline, and the program is called…… BLUESKY\n\nthepointsguy.com/news/united-...",
        },
        embed: {
          $type: "app.bsky.embed.external#view",
          external: {
            uri: "https://thepointsguy.com/news/united-airlines-jetblue-partnership/",
            title:
              "United Airlines and JetBlue to team up in new, blockbuster partnership - The Points Guy",
            description:
              'Major news on the airline front: United Airlines and JetBlue will partner in a new alliance called "Blue Sky."',
            thumb:
              "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreigyuia4essey6h7jol22uv4zxl7vuifcjfbx4bnrjx36v22cksaqq@jpeg",
          },
        },
        replyCount: 16,
        repostCount: 28,
        likeCount: 368,
        quoteCount: 17,
        indexedAt: "2025-05-29T12:23:11.950Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lpcmfkbsbk2v",
        cid: "bafyreig6czmf3oy7oyutycacweuopgycpbnxolx75zw6ro5wrynbvmbmae",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-05-16T18:02:47.911Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 133,
                  width: 488,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreibjv6yymtrlwgnwgk5nrs4gw4qtk6kord2m577fijhhrzu2222tli",
                  },
                  mimeType: "image/jpeg",
                  size: 20010,
                },
              },
            ],
          },
          langs: ["en"],
          text: "🙏🏾",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreibjv6yymtrlwgnwgk5nrs4gw4qtk6kord2m577fijhhrzu2222tli@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreibjv6yymtrlwgnwgk5nrs4gw4qtk6kord2m577fijhhrzu2222tli@jpeg",
              alt: "",
              aspectRatio: {
                height: 133,
                width: 488,
              },
            },
          ],
        },
        replyCount: 42,
        repostCount: 10,
        likeCount: 831,
        quoteCount: 1,
        indexedAt: "2025-05-16T18:02:49.753Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3log7sqa3js2s",
        cid: "bafyreidimqtsj33twur7d4yt2cvk2kod6pm5to4t2j7s4uqftb6stkklly",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-05-05T11:02:59.050Z",
          embed: {
            $type: "app.bsky.embed.external",
            external: {
              description: "YouTube video by Saar",
              thumb: {
                $type: "blob",
                ref: {
                  $link:
                    "bafkreifb67rsldfccvaqraljdcfy4opptbkc6yg3ssuveacr745lrimdri",
                },
                mimeType: "image/jpeg",
                size: 30772,
              },
              title: "Nobody Tells This To Beginners",
              uri: "https://youtu.be/E1oZhEIrer4?si=qT4tctSAqZ4HWFos",
            },
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://youtu.be/E1oZhEIrer4?si=qT4tctSAqZ4HWFos",
                },
              ],
              index: {
                byteEnd: 117,
                byteStart: 93,
              },
            },
          ],
          langs: ["en"],
          text: "Probably my favorite YouTube video of all time. 90 seconds of inspiration to last a lifetime youtu.be/E1oZhEIrer4?...",
        },
        embed: {
          $type: "app.bsky.embed.external#view",
          external: {
            uri: "https://youtu.be/E1oZhEIrer4?si=qT4tctSAqZ4HWFos",
            title: "Nobody Tells This To Beginners",
            description: "YouTube video by Saar",
            thumb:
              "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreifb67rsldfccvaqraljdcfy4opptbkc6yg3ssuveacr745lrimdri@jpeg",
          },
        },
        replyCount: 14,
        repostCount: 45,
        likeCount: 375,
        quoteCount: 6,
        indexedAt: "2025-05-05T11:03:00.085Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lnicr3nq5k2h",
        cid: "bafyreig3x4wiwr2bytqq5pw4s5y3g6pp27lcn4hzbjk2okflouqzez5xlu",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-04-23T13:35:52.975Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1498,
                  width: 1999,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreif5edbo45bezrnidzxhni6gqois7fczcqezlsgcp2uo3ssd45q2fy",
                  },
                  mimeType: "image/jpeg",
                  size: 277617,
                },
              },
            ],
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
                },
              ],
              index: {
                byteEnd: 175,
                byteStart: 144,
              },
            },
          ],
          langs: ["en"],
          text: 'Today is the 20 year anniversary of the first YouTube upload EVER. "Me at the zoo" now has 355 million views and over 10 million comments 🎂\n\nwww.youtube.com/watch?v=jNQX...',
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreif5edbo45bezrnidzxhni6gqois7fczcqezlsgcp2uo3ssd45q2fy@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreif5edbo45bezrnidzxhni6gqois7fczcqezlsgcp2uo3ssd45q2fy@jpeg",
              alt: "",
              aspectRatio: {
                height: 1498,
                width: 1999,
              },
            },
          ],
        },
        replyCount: 43,
        repostCount: 212,
        likeCount: 2146,
        quoteCount: 24,
        indexedAt: "2025-04-23T13:35:54.878Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lmwonoqmhc25",
        cid: "bafyreiebrg6pw3ca2hynf6mmutj3nbml4m5w2ui3eslyq5zay2rf5joqre",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-04-16T13:20:48.409Z",
          langs: ["en"],
          text: "Jokic deserves MVP\nShai deserves MVP\nI've literally been swayed back and forth on the NBA MVP debate several times in the last week, to the point where this is the first year I'd be totally cool with 2 players sharing co-MVP... even though I know it won't happen 😭",
        },
        replyCount: 41,
        repostCount: 4,
        likeCount: 263,
        quoteCount: 4,
        indexedAt: "2025-04-16T13:20:48.686Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lmkdtuvm2k2j",
        cid: "bafyreiczptktxdwupnqjp5iiyr7xfzhz45kk6o5bev42awjtzvfrna534i",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-04-11T15:35:28.163Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1999,
                  width: 1500,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreiazegfumzmutmitxjjlbdnlnjsikmw63hshv3rpw5adej45viwvsy",
                  },
                  mimeType: "image/jpeg",
                  size: 675342,
                },
              },
            ],
          },
          langs: ["en"],
          text: "Soon",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiazegfumzmutmitxjjlbdnlnjsikmw63hshv3rpw5adej45viwvsy@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiazegfumzmutmitxjjlbdnlnjsikmw63hshv3rpw5adej45viwvsy@jpeg",
              alt: "",
              aspectRatio: {
                height: 1999,
                width: 1500,
              },
            },
          ],
        },
        replyCount: 75,
        repostCount: 17,
        likeCount: 732,
        quoteCount: 13,
        indexedAt: "2025-04-11T15:35:52.085Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lmatjhxdzc26",
        cid: "bafyreidczp7lop3cxlndnqhemgnlvujnibdrlyivnzwcz4vwed2q3hg4pe",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-04-07T20:49:21.532Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1999,
                  width: 1500,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreiduz2ykigau6bt2gj2g7mer3oag3p3tkijmhrsmr2admflqcccgky",
                  },
                  mimeType: "image/jpeg",
                  size: 753692,
                },
              },
            ],
          },
          langs: ["en"],
          text: "I have so many thoughts I didn’t realize I’d have, after trying this minimal phone AKA Light Phone 3. Maybe worth a video…",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiduz2ykigau6bt2gj2g7mer3oag3p3tkijmhrsmr2admflqcccgky@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiduz2ykigau6bt2gj2g7mer3oag3p3tkijmhrsmr2admflqcccgky@jpeg",
              alt: "",
              aspectRatio: {
                height: 1999,
                width: 1500,
              },
            },
          ],
        },
        replyCount: 103,
        repostCount: 27,
        likeCount: 1415,
        quoteCount: 12,
        indexedAt: "2025-04-07T20:49:23.513Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3llopc3t4522d",
        cid: "bafyreifewnfrttbrk5jpww6cn6w3lvvn2ibdd2ogyvqh634m4umeydx4dm",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-03-31T15:45:43.643Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1500,
                  width: 1999,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreifs5syrhbw646xtj2bqjhlavz52hikrtyckteogmvio3566g4dvru",
                  },
                  mimeType: "image/jpeg",
                  size: 436309,
                },
              },
              {
                alt: "",
                aspectRatio: {
                  height: 1080,
                  width: 1920,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreiai2cbzzaxrauspqfnzm7k2s5mbmlmelzg4fdrla3qgdrane4yqpe",
                  },
                  mimeType: "image/jpeg",
                  size: 476810,
                },
              },
            ],
          },
          langs: ["en"],
          text: "The idea vs the execution",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreifs5syrhbw646xtj2bqjhlavz52hikrtyckteogmvio3566g4dvru@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreifs5syrhbw646xtj2bqjhlavz52hikrtyckteogmvio3566g4dvru@jpeg",
              alt: "",
              aspectRatio: {
                height: 1500,
                width: 1999,
              },
            },
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiai2cbzzaxrauspqfnzm7k2s5mbmlmelzg4fdrla3qgdrane4yqpe@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiai2cbzzaxrauspqfnzm7k2s5mbmlmelzg4fdrla3qgdrane4yqpe@jpeg",
              alt: "",
              aspectRatio: {
                height: 1080,
                width: 1920,
              },
            },
          ],
        },
        replyCount: 47,
        repostCount: 54,
        likeCount: 1695,
        quoteCount: 3,
        indexedAt: "2025-03-31T15:45:46.498Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lloixho7oc2d",
        cid: "bafyreibke2qx6wcy6zc3h25io27n5mb6r6vdosz4pf4gqimouyfcdb5oy4",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-03-31T13:52:24.549Z",
          embed: {
            $type: "app.bsky.embed.record",
            record: {
              cid: "bafyreiclj32dxlt3lv67r24hy27d2buadajwwpj3ziwqs66i7tosnvmbsu",
              uri: "at://did:plc:g45u5yjzuvvmzyn346dtlemj/app.bsky.feed.post/3llkylad2qk2j",
            },
          },
          langs: ["en"],
          text: "I was outside for this. We had ultimate frisbee practice. Not exaggerating, the temperature dropped from 75 to 45 with a single 3-second gust of wind. It was unreal\n\nNow the headlines are showing it was the single largest 1-hour temperature drop ever recorded 😅",
        },
        embed: {
          $type: "app.bsky.embed.record#view",
          record: {
            $type: "app.bsky.embed.record#viewRecord",
            uri: "at://did:plc:g45u5yjzuvvmzyn346dtlemj/app.bsky.feed.post/3llkylad2qk2j",
            cid: "bafyreiclj32dxlt3lv67r24hy27d2buadajwwpj3ziwqs66i7tosnvmbsu",
            author: {
              did: "did:plc:g45u5yjzuvvmzyn346dtlemj",
              handle: "brianvan.bsky.social",
              displayName: "TEMU Mark Ruffalo",
              avatar:
                "https://cdn.bsky.app/img/avatar/plain/did:plc:g45u5yjzuvvmzyn346dtlemj/bafkreihbe4jmnfe2c4wktfnoeef6tcgpprvhwvli3ize4sfsttnbxrfcqa@jpeg",
              associated: {
                chat: {
                  allowIncoming: "following",
                },
                activitySubscription: {
                  allowSubscriptions: "followers",
                },
              },
              labels: [],
              createdAt: "2023-07-03T07:54:11.408Z",
            },
            value: {
              $type: "app.bsky.feed.post",
              createdAt: "2025-03-30T04:21:15.105Z",
              embed: {
                $type: "app.bsky.embed.external",
                external: {
                  description:
                    '3,597 likes, 148 comments - awxnyc on March 29, 2025: "🔥➡️🥶 WOOAAAAAHHHHH.\n\n#NYC dropped nearly 30 DEGREES in ONE HOUR. Biggest temperature drop EVER recorded! 🌡️🤯\n\nFollow @awxnyc @skylerdaywx for upd...',
                  thumb: {
                    $type: "blob",
                    ref: {
                      $link:
                        "bafkreidohgxwoubjlpqk5urmik4kwax6lss5pmkdo5s7sbrduj2mn4rccu",
                    },
                    mimeType: "image/jpeg",
                    size: 632197,
                  },
                  title:
                    'Allan Nosoff on Instagram: "🔥➡️🥶 WOOAAAAAHHHHH.\n\n#NYC dropped nearly 30 DEGREES in ONE HOUR. Biggest temperature drop EVER recorded! 🌡️🤯\n\nFollow @awxnyc @skylerdaywx for updates! ✅\n\nDid you feel the d...',
                  uri: "https://www.instagram.com/awxnyc/p/DHzaJYPJFD6/",
                },
              },
              langs: ["en"],
              text: "New York had a blissfully warm day today, sunny and near 80 degrees\n\nAnd then to everyone's shock, it got CHILLY\n\nIt suddenly got ~25 degrees colder in a very short amount of time\n\nTurns out it was the largest 1-hour temperature drop ever measured here",
            },
            labels: [],
            likeCount: 75,
            replyCount: 3,
            repostCount: 9,
            quoteCount: 13,
            indexedAt: "2025-03-30T04:21:17.200Z",
            embeds: [
              {
                $type: "app.bsky.embed.external#view",
                external: {
                  uri: "https://www.instagram.com/awxnyc/p/DHzaJYPJFD6/",
                  title:
                    'Allan Nosoff on Instagram: "🔥➡️🥶 WOOAAAAAHHHHH.\n\n#NYC dropped nearly 30 DEGREES in ONE HOUR. Biggest temperature drop EVER recorded! 🌡️🤯\n\nFollow @awxnyc @skylerdaywx for updates! ✅\n\nDid you feel the d...',
                  description:
                    '3,597 likes, 148 comments - awxnyc on March 29, 2025: "🔥➡️🥶 WOOAAAAAHHHHH.\n\n#NYC dropped nearly 30 DEGREES in ONE HOUR. Biggest temperature drop EVER recorded! 🌡️🤯\n\nFollow @awxnyc @skylerdaywx for upd...',
                  thumb:
                    "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:g45u5yjzuvvmzyn346dtlemj/bafkreidohgxwoubjlpqk5urmik4kwax6lss5pmkdo5s7sbrduj2mn4rccu@jpeg",
                },
              },
            ],
          },
        },
        replyCount: 52,
        repostCount: 114,
        likeCount: 975,
        quoteCount: 8,
        indexedAt: "2025-03-31T13:52:24.704Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lkv3w2zpoc2p",
        cid: "bafyreidmzpseepj44hzxg52bhyepkvwq7y2e534oqisdog4iir4nimeaky",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-03-21T11:22:25.637Z",
          langs: ["en"],
          text: "Yes, I still miss Daft Punk regularly",
        },
        replyCount: 100,
        repostCount: 176,
        likeCount: 2517,
        quoteCount: 18,
        indexedAt: "2025-03-21T11:22:25.851Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lkbs5t4fyc2q",
        cid: "bafyreidcrhxdrbzamh77z6nc4uump23pompq7d4ulxtlk3jfnhbpbk53dq",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-03-13T19:07:13.325Z",
          langs: ["en"],
          text: "I could easily be convinced that autocorrect has slowly been getting worse over the last couple of years",
        },
        replyCount: 332,
        repostCount: 187,
        likeCount: 3777,
        quoteCount: 77,
        indexedAt: "2025-03-13T19:07:13.548Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3ljprgbyt3s2u",
        cid: "bafyreiderz7lvckc3qowmorstlykv5vxhxb6t64p5eio2vjxailmddwk6i",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-03-06T15:06:08.339Z",
          embed: {
            $type: "app.bsky.embed.external",
            external: {
              description:
                "Tapbots will still work on Ivory for Mastodon, too.",
              thumb: {
                $type: "blob",
                ref: {
                  $link:
                    "bafkreibetrraly2i7fpvx7xr6kvialcpjjm7eawcrcfwtrq4uhikqj6xzq",
                },
                mimeType: "image/jpeg",
                size: 285640,
              },
              title: "Tweetbot’s developers are making a Bluesky app",
              uri: "https://www.theverge.com/news/624926/tweetbots-developers-are-making-a-bluesky-client",
            },
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://www.theverge.com/news/624926/tweetbots-developers-are-making-a-bluesky-client",
                },
              ],
              index: {
                byteEnd: 118,
                byteStart: 86,
              },
            },
          ],
          langs: ["en"],
          text: "I'm so ready for a dedicated app and not needing to keep a browser tab open. Godspeed www.theverge.com/news/624926/...",
        },
        embed: {
          $type: "app.bsky.embed.external#view",
          external: {
            uri: "https://www.theverge.com/news/624926/tweetbots-developers-are-making-a-bluesky-client",
            title: "Tweetbot’s developers are making a Bluesky app",
            description: "Tapbots will still work on Ivory for Mastodon, too.",
            thumb:
              "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreibetrraly2i7fpvx7xr6kvialcpjjm7eawcrcfwtrq4uhikqj6xzq@jpeg",
          },
        },
        replyCount: 51,
        repostCount: 92,
        likeCount: 1305,
        quoteCount: 21,
        indexedAt: "2025-03-06T15:06:09.650Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3ljlhgkjyys2h",
        cid: "bafyreiaz2td4rx32oz4w3tg4y2del23mzmuiubozz65m56omrsw7es6oly",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-03-04T21:56:40.918Z",
          embed: {
            $type: "app.bsky.embed.video",
            aspectRatio: {
              height: 2048,
              width: 4096,
            },
            video: {
              $type: "blob",
              ref: {
                $link:
                  "bafkreidr67l7ccinv2uzplayco2ahf2y24k572sfnqdjgmobcj2p3jfe7i",
              },
              mimeType: "video/mp4",
              size: 6547903,
            },
          },
          langs: ["en"],
          text: "Experimenting with how video works/looks on BlueSky 👀",
        },
        embed: {
          $type: "app.bsky.embed.video#view",
          cid: "bafkreidr67l7ccinv2uzplayco2ahf2y24k572sfnqdjgmobcj2p3jfe7i",
          playlist:
            "https://video.bsky.app/watch/did%3Aplc%3Ays5aypbbeqmwn42edy5t3sho/bafkreidr67l7ccinv2uzplayco2ahf2y24k572sfnqdjgmobcj2p3jfe7i/playlist.m3u8",
          thumbnail:
            "https://video.bsky.app/watch/did%3Aplc%3Ays5aypbbeqmwn42edy5t3sho/bafkreidr67l7ccinv2uzplayco2ahf2y24k572sfnqdjgmobcj2p3jfe7i/thumbnail.jpg",
          aspectRatio: {
            height: 2048,
            width: 4096,
          },
        },
        replyCount: 161,
        repostCount: 145,
        likeCount: 3907,
        quoteCount: 23,
        indexedAt: "2025-03-04T21:56:41.854Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lioxr6uwbc23",
        cid: "bafyreianjmb7fmwx6432gnol5h3lwudbku6ptvk5qrdekdd7critdwhjnq",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-02-21T14:01:45.236Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 2000,
                  width: 1500,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreidvtaqlfzfcpau3bogjcef4iiohi5cul6rylv6zdpkxvlhlltavvy",
                  },
                  mimeType: "image/jpeg",
                  size: 336755,
                },
              },
              {
                alt: "",
                aspectRatio: {
                  height: 2000,
                  width: 1500,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreifam6xle4vbaos6vwg5z52qi7xwb2aiu6mnqolu7zykd34nvihtnu",
                  },
                  mimeType: "image/jpeg",
                  size: 416731,
                },
              },
            ],
          },
          langs: ["en"],
          text: "Confirmed: The OnePlus Watch 3 has a typo in the back: Meda in China 🫠",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreidvtaqlfzfcpau3bogjcef4iiohi5cul6rylv6zdpkxvlhlltavvy@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreidvtaqlfzfcpau3bogjcef4iiohi5cul6rylv6zdpkxvlhlltavvy@jpeg",
              alt: "",
              aspectRatio: {
                height: 2000,
                width: 1500,
              },
            },
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreifam6xle4vbaos6vwg5z52qi7xwb2aiu6mnqolu7zykd34nvihtnu@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreifam6xle4vbaos6vwg5z52qi7xwb2aiu6mnqolu7zykd34nvihtnu@jpeg",
              alt: "",
              aspectRatio: {
                height: 2000,
                width: 1500,
              },
            },
          ],
        },
        replyCount: 145,
        repostCount: 78,
        likeCount: 1957,
        quoteCount: 16,
        indexedAt: "2025-02-21T14:01:51.254Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lik6lm7uzk2l",
        cid: "bafyreid5dsifsmge7sel7izj4mgnf7jhhwp5sgcgjfhrffg2hdvnbbbevy",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-02-19T16:20:35.414Z",
          embed: {
            $type: "app.bsky.embed.external",
            external: {
              description:
                "Apple today announced iPhone 16e, a new addition to the iPhone 16 lineup that offers powerful capabilities at a more affordable price.",
              thumb: {
                $type: "blob",
                ref: {
                  $link:
                    "bafkreic2mgknzpssfjnlu762we66v6tzmuugndvfhhowgmw2prqqp3dsem",
                },
                mimeType: "image/jpeg",
                size: 188269,
              },
              title:
                "Apple debuts iPhone 16e: A powerful new member of the iPhone 16 family",
              uri: "https://www.apple.com/newsroom/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/",
            },
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://www.apple.com/newsroom/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/",
                },
              ],
              index: {
                byteEnd: 290,
                byteStart: 261,
              },
            },
          ],
          langs: ["en"],
          text: 'iPhone 16E is officially announced\n\n- White or black\n- A18 chip\n- 6.1" OLED with a notch\n- Single 48mp camera\n- Action button\n- Supports apple Intelligence\n-USB-C (finally)\n- Their first in-house cellular modem "C1"\n\n$599 - That is a big jump from the last SE\n\nwww.apple.com/newsroom/202...',
        },
        embed: {
          $type: "app.bsky.embed.external#view",
          external: {
            uri: "https://www.apple.com/newsroom/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/",
            title:
              "Apple debuts iPhone 16e: A powerful new member of the iPhone 16 family",
            description:
              "Apple today announced iPhone 16e, a new addition to the iPhone 16 lineup that offers powerful capabilities at a more affordable price.",
            thumb:
              "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreic2mgknzpssfjnlu762we66v6tzmuugndvfhhowgmw2prqqp3dsem@jpeg",
          },
        },
        replyCount: 186,
        repostCount: 61,
        likeCount: 1096,
        quoteCount: 28,
        indexedAt: "2025-02-19T16:20:36.453Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3li56zjlsdk2s",
        cid: "bafyreiaboc7yyrvdeger267abqgbhaldlowr3onq7uyqqlxbfaghp4s5a4",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-02-14T12:23:45.816Z",
          langs: ["en"],
          text: "Today, 20 years ago on Valentine's Day, YouTube was born.\n\nThings that were not around when YouTube started:\n\nVine\nTiktok\nInstagram\nReddit\nSnapchat\nZoom\nThe iPhone\nBitcoin\nWhatsapp\nUber\nAirbnb",
        },
        replyCount: 88,
        repostCount: 151,
        likeCount: 1941,
        quoteCount: 15,
        indexedAt: "2025-02-14T12:23:46.357Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lhwbot4o2k2h",
        cid: "bafyreiajhitqs6el5o2aycsjlloss2nenuryfzz2nizd3kmcddpfb5ayua",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-02-11T18:22:49.770Z",
          langs: ["en"],
          text: "Seems like there's 2 types of people: Those who NEVER watch YouTube on the TV, and those who watch YouTube on TVs ALL THE TIME",
        },
        replyCount: 334,
        repostCount: 88,
        likeCount: 2773,
        quoteCount: 41,
        indexedAt: "2025-02-11T18:22:49.962Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lhjiwbnc7k2y",
        cid: "bafyreicxg6g6fuup3vfspy2osmmdarwxewisxklyxu4p433la7joi7knku",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-02-06T16:27:39.434Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 994,
                  width: 2000,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreiasccp5khh3g6slla5rgxk2vwinvr5abrsd3ahi4nsapgpwgj4xli",
                  },
                  mimeType: "image/jpeg",
                  size: 200236,
                },
              },
            ],
          },
          langs: ["en"],
          text: "The pear on the computer in the background. It's the little things. If you know, you know 🤓",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiasccp5khh3g6slla5rgxk2vwinvr5abrsd3ahi4nsapgpwgj4xli@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiasccp5khh3g6slla5rgxk2vwinvr5abrsd3ahi4nsapgpwgj4xli@jpeg",
              alt: "",
              aspectRatio: {
                height: 994,
                width: 2000,
              },
            },
          ],
        },
        replyCount: 105,
        repostCount: 54,
        likeCount: 2467,
        quoteCount: 3,
        indexedAt: "2025-02-06T16:27:41.153Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lgvsssjysc2r",
        cid: "bafyreihjumozcsh2hn4q24sa4mj5y2orj72cyrqqoqelmlg2pknic52yh4",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-29T20:31:25.613Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 883,
                  width: 2000,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreibogst5riyngx6yb4oe4tvdn4v5z3nntcodaoti3r3i37ictlygla",
                  },
                  mimeType: "image/jpeg",
                  size: 528679,
                },
              },
            ],
          },
          langs: ["en"],
          text: "I get so many ridiculous dumb emails for products that you guys never hear about, but I couldn't resist sharing this one: a THREE HUNDRED DOLLAR water bottle that promises to add hydrogen to your water and track your usage 🤦🏾‍♂️\n\nMaybe it's almost time for another \"saying yes to everything\" video 😭",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreibogst5riyngx6yb4oe4tvdn4v5z3nntcodaoti3r3i37ictlygla@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreibogst5riyngx6yb4oe4tvdn4v5z3nntcodaoti3r3i37ictlygla@jpeg",
              alt: "",
              aspectRatio: {
                height: 883,
                width: 2000,
              },
            },
          ],
        },
        replyCount: 182,
        repostCount: 87,
        likeCount: 2035,
        quoteCount: 30,
        indexedAt: "2025-01-29T20:31:26.955Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lgr4efwxxs2d",
        cid: "bafyreidme753gnetqz5fvm6ih7odfc4mdkw47ll3nk6eal2hth4oqplg64",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-27T23:39:01.378Z",
          embed: {
            $type: "app.bsky.embed.external",
            external: {
              description: "YouTube video by Marques Brownlee",
              thumb: {
                $type: "blob",
                ref: {
                  $link:
                    "bafkreic5jdaavfjd4523mi6dbylpo7rkrit7bohaoquowx7zl3jahf5d2q",
                },
                mimeType: "image/jpeg",
                size: 242599,
              },
              title: "I Tried Samsung's Secret Android XR Headset!",
              uri: "https://youtu.be/az5QL_NLBvg",
            },
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://youtu.be/az5QL_NLBvg",
                },
              ],
              index: {
                byteEnd: 178,
                byteStart: 158,
              },
            },
          ],
          langs: ["en"],
          text: "NEW VIDEO - I Tried Samsung's Secret Android XR Headset, and it was awesome. Think of it as the Nexus/Pixel of headsets. Coming later this year.\n\nFull video: youtu.be/az5QL_NLBvg",
        },
        embed: {
          $type: "app.bsky.embed.external#view",
          external: {
            uri: "https://youtu.be/az5QL_NLBvg",
            title: "I Tried Samsung's Secret Android XR Headset!",
            description: "YouTube video by Marques Brownlee",
            thumb:
              "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreic5jdaavfjd4523mi6dbylpo7rkrit7bohaoquowx7zl3jahf5d2q@jpeg",
          },
        },
        replyCount: 47,
        repostCount: 55,
        likeCount: 1196,
        quoteCount: 14,
        indexedAt: "2025-01-27T23:39:02.352Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lgo54gd4f22r",
        cid: "bafyreicyb5jabt6ij3h66ezkljzk7zjuiee466xnw3impecjbefvwiknya",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-26T19:14:27.868Z",
          embed: {
            $type: "app.bsky.embed.external",
            external: {
              description: "YouTube video by Nothing",
              thumb: {
                $type: "blob",
                ref: {
                  $link:
                    "bafkreibl2x457rrb3u2klyianb45i6bav62gjfwwxltjbbiwlq2eckkgmi",
                },
                mimeType: "image/jpeg",
                size: 263860,
              },
              title: "We made MKBHD's Dream Phone",
              uri: "https://youtu.be/bny2NJkJGXc?si=W3LCSeYtlBNBKIAj",
            },
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://youtu.be/bny2NJkJGXc?si=oNpWzWdT34MPd7s3",
                },
              ],
              index: {
                byteEnd: 300,
                byteStart: 276,
              },
            },
          ],
          langs: ["en"],
          text: "Really interesting video - Breaking down roughly what the bill of materials for my 2025 dream phone would actually cost\n\n- 6000mah battery: $13\n- 120Hz LTPO AMOLED: $35\n- S24 Ultra back cams: $80\n- 1TB, 16GB RAM: $90\n- Snapdragon 8 Elite: $190\n- Packaging: $30\n\nTotal: ~$500\n\nyoutu.be/bny2NJkJGXc?...",
        },
        embed: {
          $type: "app.bsky.embed.external#view",
          external: {
            uri: "https://youtu.be/bny2NJkJGXc?si=W3LCSeYtlBNBKIAj",
            title: "We made MKBHD's Dream Phone",
            description: "YouTube video by Nothing",
            thumb:
              "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreibl2x457rrb3u2klyianb45i6bav62gjfwwxltjbbiwlq2eckkgmi@jpeg",
          },
        },
        replyCount: 87,
        repostCount: 73,
        likeCount: 1694,
        quoteCount: 11,
        indexedAt: "2025-01-26T19:14:29.061Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lgdxc7klpc2k",
        cid: "bafyreiekvsbnl5n2umwu5drwwnpimj7t5btesqvtpyt7etuou2duv5b6ji",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-22T18:03:42.261Z",
          embed: {
            $type: "app.bsky.embed.images",
            images: [
              {
                alt: "",
                aspectRatio: {
                  height: 1080,
                  width: 1920,
                },
                image: {
                  $type: "blob",
                  ref: {
                    $link:
                      "bafkreiaq3haw7bkfqgg7f57vfq236j754kqpd7bzxud7rmzx62hc5cysui",
                  },
                  mimeType: "image/jpeg",
                  size: 548628,
                },
              },
            ],
          },
          facets: [
            {
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: "https://youtu.be/SAb4zRyxrD4",
                },
              ],
              index: {
                byteEnd: 171,
                byteStart: 151,
              },
            },
          ],
          langs: ["en"],
          text: "NEW VIDEO - Hands-on with the Samsung Galaxy S25 series... I swear these are the new phones, even though they look exactly like last year. Full video: youtu.be/SAb4zRyxrD4",
        },
        embed: {
          $type: "app.bsky.embed.images#view",
          images: [
            {
              thumb:
                "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiaq3haw7bkfqgg7f57vfq236j754kqpd7bzxud7rmzx62hc5cysui@jpeg",
              fullsize:
                "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiaq3haw7bkfqgg7f57vfq236j754kqpd7bzxud7rmzx62hc5cysui@jpeg",
              alt: "",
              aspectRatio: {
                height: 1080,
                width: 1920,
              },
            },
          ],
        },
        replyCount: 85,
        repostCount: 50,
        likeCount: 1510,
        quoteCount: 12,
        indexedAt: "2025-01-22T18:03:45.458Z",
        labels: [],
        threadgate: {
          uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.threadgate/3lgdxc7klpc2k",
          cid: "bafyreid5uawldimikaizlerofxseqldnjuaruqtcp3tb5fibfpg4e3vacu",
          record: {
            $type: "app.bsky.feed.threadgate",
            createdAt: "2025-01-23T01:26:20.889Z",
            hiddenReplies: [
              "at://did:plc:nxdm4lxeuvghleuwraxcqr6z/app.bsky.feed.post/3lgeoskwnas2k",
            ],
            post: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lgdxc7klpc2k",
          },
          lists: [],
        },
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lfsqdscy722x",
        cid: "bafyreidny357znqfn2ienincp6ojkbatcrlb575i4i7p3ucrj45xcyvcji",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-15T21:44:03.748Z",
          embed: {
            $type: "app.bsky.embed.record",
            record: {
              cid: "bafyreickuqlwb5rgx5o6e4jhhsvsvv3rfnlmo2wrsx7ugnqkdpo6jr2kci",
              uri: "at://did:plc:7exlcsle4mjfhu3wnhcgizz6/app.bsky.feed.post/3lfsnd645bc2o",
            },
          },
          langs: ["en"],
          text: "Sacrificing some battery to make the phone stunningly thin... and then probably putting a case on it anyway. The trendy tradeoff nobody asked for 😅",
        },
        embed: {
          $type: "app.bsky.embed.record#view",
          record: {
            $type: "app.bsky.embed.record#viewRecord",
            uri: "at://did:plc:7exlcsle4mjfhu3wnhcgizz6/app.bsky.feed.post/3lfsnd645bc2o",
            cid: "bafyreickuqlwb5rgx5o6e4jhhsvsvv3rfnlmo2wrsx7ugnqkdpo6jr2kci",
            author: {
              did: "did:plc:7exlcsle4mjfhu3wnhcgizz6",
              handle: "theverge.com",
              displayName: "The Verge",
              avatar:
                "https://cdn.bsky.app/img/avatar/plain/did:plc:7exlcsle4mjfhu3wnhcgizz6/bafkreif54hai2n2elc7h6ka5qs4q2tbj5w3gh27s2z7c6nkh44kxt5nzhe@jpeg",
              associated: {
                activitySubscription: {
                  allowSubscriptions: "followers",
                },
              },
              labels: [],
              createdAt: "2023-05-23T19:11:25.009Z",
              verification: {
                verifications: [
                  {
                    issuer: "did:plc:z72i7hdynmk6r22z27h6tvur",
                    uri: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.graph.verification/3lndpvilhl62l",
                    isValid: true,
                    createdAt: "2025-04-21T10:47:40.526Z",
                  },
                ],
                verifiedStatus: "valid",
                trustedVerifierStatus: "none",
              },
            },
            value: {
              $type: "app.bsky.feed.post",
              createdAt: "2025-01-15T20:50:00.687Z",
              embed: {
                $type: "app.bsky.embed.external",
                external: {
                  description: "The phone could be just 6.4mm thin.",
                  thumb: {
                    $type: "blob",
                    ref: {
                      $link:
                        "bafkreicihzomlvej36g7mow2bea6pc7jix45qqgvy5zjgls6rey2z5rlvy",
                    },
                    mimeType: "image/jpeg",
                    size: 28667,
                  },
                  title:
                    "Leaked Samsung S25 Slim images show off its super-thin design",
                  uri: "https://buff.ly/4h1uayb",
                },
              },
              text: "Leaked Samsung Galaxy S25 Slim images show off its super-thin design",
            },
            labels: [],
            likeCount: 69,
            replyCount: 11,
            repostCount: 7,
            quoteCount: 9,
            indexedAt: "2025-01-15T20:50:02.155Z",
            embeds: [
              {
                $type: "app.bsky.embed.external#view",
                external: {
                  uri: "https://buff.ly/4h1uayb",
                  title:
                    "Leaked Samsung S25 Slim images show off its super-thin design",
                  description: "The phone could be just 6.4mm thin.",
                  thumb:
                    "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:7exlcsle4mjfhu3wnhcgizz6/bafkreicihzomlvej36g7mow2bea6pc7jix45qqgvy5zjgls6rey2z5rlvy@jpeg",
                },
              },
            ],
          },
        },
        replyCount: 66,
        repostCount: 23,
        likeCount: 712,
        quoteCount: 3,
        indexedAt: "2025-01-15T21:44:03.971Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lfrvpde4222g",
        cid: "bafyreigezc6gk5qix2qojoij65pbdtuausp4gkwpjxca3vqsfqoay4mxqa",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-15T13:47:19.680Z",
          langs: ["en"],
          text: "Imagine if media literacy as a high school class. Literally teaching kids how to read and parse and fact check consumed media. I see no downsides. Maximum real life applicability.",
        },
        replyCount: 131,
        repostCount: 122,
        likeCount: 1306,
        quoteCount: 24,
        indexedAt: "2025-01-15T13:47:20.546Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lfq7fowu4k2q",
        cid: "bafyreicwo6wac6nqwtff7riuunmbdkurch5zs577eceei4ihpt642s3pxi",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-14T21:35:34.227Z",
          langs: ["en"],
          text: "Fun fact if you know what time you were born, you can calculate the moment you live your 1 BILLIONTH second:\n31 years\n8 months\n15 days\nand 12 hours\n(Approximately, disregarding leap years)",
        },
        replyCount: 30,
        repostCount: 17,
        likeCount: 392,
        quoteCount: 1,
        indexedAt: "2025-01-14T21:35:34.469Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lfprx65hls2h",
        cid: "bafyreiedsfg74xanonbanytlfaz6k45q67vcs77b246rexk744q4mbhlki",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-14T17:34:48.211Z",
          langs: ["en"],
          text: "Something about Tiktok getting banned for the potential of Chinese access to our data and then Americans banding together to make the direct Chinese version #1 on the app store the next day is poetic. What a weird chapter in this history books this will be",
        },
        replyCount: 63,
        repostCount: 125,
        likeCount: 1586,
        quoteCount: 6,
        indexedAt: "2025-01-14T17:34:48.455Z",
        labels: [],
      },
    },
    {
      post: {
        uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lfd5dspmo22d",
        cid: "bafyreidwyim26rsyos6wvbrey3fvg5wsgfkooorathjyorb544sv225cry",
        author: {
          did: "did:plc:ys5aypbbeqmwn42edy5t3sho",
          handle: "mkbhd.com",
          displayName: "Marques Brownlee",
          avatar:
            "https://cdn.bsky.app/img/avatar/plain/did:plc:ys5aypbbeqmwn42edy5t3sho/bafkreiakhq5xi4v74q2oox5nkw4cdlxjtrv2obmhklovjl3xfy2kijkhya@jpeg",
          associated: {
            activitySubscription: {
              allowSubscriptions: "followers",
            },
          },
          labels: [],
          createdAt: "2023-04-28T18:24:00.602Z",
        },
        record: {
          $type: "app.bsky.feed.post",
          createdAt: "2025-01-09T16:54:06.992Z",
          langs: ["en"],
          text: "2025. Back to basics. Clearly define your goals. Say no to anything that dilutes your focus. Execute. Continually refine.",
        },
        replyCount: 59,
        repostCount: 92,
        likeCount: 1200,
        quoteCount: 14,
        indexedAt: "2025-01-09T16:54:07.257Z",
        labels: [],
        threadgate: {
          uri: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.threadgate/3lfd5dspmo22d",
          cid: "bafyreifbpeq6rqzjjl4bxuxllkzxyyjmeo54snfs5clvx5crorsolzuoka",
          record: {
            $type: "app.bsky.feed.threadgate",
            createdAt: "2025-01-10T16:18:58.951Z",
            hiddenReplies: [
              "at://did:plc:644mjsrbry7fkc4dhgtkotzg/app.bsky.feed.post/3lfflidhacu2e",
            ],
            post: "at://did:plc:ys5aypbbeqmwn42edy5t3sho/app.bsky.feed.post/3lfd5dspmo22d",
          },
          lists: [],
        },
      },
    },
  ],
  cursor: "2025-01-09T16:54:06.992Z",
};
