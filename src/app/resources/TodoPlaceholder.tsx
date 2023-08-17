export default function getTodoPlaceholder() {
  const randomNum = Math.floor(Math.random() * 20) + 1;
  const funnyTodos: string[] = [
    "Find the TV remote",
    "Teach the cat to dance",
    "Invent a new color",
    "Count the stars",
    "Convince the fridge to chill",
    "Unsend an email from 5 years ago",
    "Teach a fish to ride a bicycle",
    "Solve a Rubik's Cube in 3 seconds",
    "Make friends with a plant",
    "Have a staring contest with a wall",
    "Learn to speak fluent squirrel",
    "Find the end of a rainbow",
    "Teach a dinosaur to floss",
    "Learn to fly without leaving the ground",
    "Discover Atlantis in your bathtub",
    "Translate baby gibberish",
    "Balance a spoon on your nose",
    "Find the meaning of life in a fortune cookie",
    "Train your pet rock to sit",
    "Convince a tree to share its wisdom",
  ];
  return funnyTodos[randomNum];
}
