import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

/**
 * It's a function that takes in a request and a response object, and then sends a response back to the
 * client
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
export const getPosts = async (req, res) => {
  try {
    const postsMessages = await PostMessage.find();
    res.status(200).json(postsMessages);
  } catch (err) {
    res.json({ message: error.message });
  }
};

/**
 * The function gets a post message by its id
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
export const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.findById(req.params.id);
    res.status(200).json(postMessage);
  } catch (err) {
    res.json({ message: error.message });
  }
};
/**
 * It creates a new post and saves it to the database
 * @param req - The request object.
 * @param res - The response object.
 */
export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    const result = await newPost.save();
    res.status(201).json(result);
  } catch (err) {
    res.json({ message: error.message });
  }

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * It takes the post object from the request body, finds the post by its id, and updates the post with
 * the new data
 * @param req - The request object.
 * @param res - The response object.
 */
export const updatePost = async (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * It finds a post by its id, increments the likes by one, saves the post, and returns the updated post
 * @param req - The request object.
 * @param res - The response object.
 */
export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * It deletes a post from the database
 * @param req - The request object.
 * @param res - The response object.
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(409).json({ message: error.message });
  }
};
