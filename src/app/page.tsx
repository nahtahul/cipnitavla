import Post from "@/components/Post";

const SAMPLE_POSTS = [
  {
    username: "Natalie Tersyn",
    handle: "nahtahul",
    content: "Just built my first Next.js app! 🚀 The developer experience is amazing. #webdev #nextjs",
    timestamp: "2h",
    likes: 42,
    comments: 7,
    retweets: 12,
  },
  {
    username: "Jane Smith",
    handle: "janesmith",
    content: "Beautiful morning for some coding ☕️ Working on some exciting new features!",
    timestamp: "4h",
    likes: 24,
    comments: 3,
    retweets: 5,
  },
  {
    username: "Tech Enthusiast",
    handle: "techlover",
    content: "The future of web development is here. Server components, streaming, and edge computing are game changers! 🌐",
    timestamp: "6h",
    likes: 128,
    comments: 15,
    retweets: 32,
  },
];

export default function Home() {
  return (
    <div className="divide-y divide-gray-200">
      <div className="p-4 bg-white sticky top-16 z-10 border-b border-gray-200">
        <textarea
          placeholder="What's happening?"
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            Post
          </button>
        </div>
      </div>
      {SAMPLE_POSTS.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}
