const imageFiles: string[] = [
   "/avatars/batman-avatar.png",
   "/avatars/boy-avatar.png",
   "/avatars/buckinghamCat-avatar.png",
   "/avatars/cardboardCat-avatar.png",
   "/avatars/cat-avatar.png",
   "/avatars/cuteDemon-avatar.png",
   "/avatars/demon-avatar.png",
   "/avatars/elephant-avatar.png",
   "/avatars/frankenstien-avatar.png",
   "/avatars/freakyFrankenstien-avatar.png",
   "/avatars/frenchFryMonster-avatar.png",
   "/avatars/germ-avatar.png",
   "/avatars/ghost-avatar.png",
   "/avatars/gingerbread-avatar.png",
   "/avatars/horse-avatar.png",
   "/avatars/husky-avatar.png",
   "/avatars/man-avatar.png",
   "/avatars/mushroom-avatar.png",
   "/avatars/owl-avatar.png",
   "/avatars/penguin-avatar.png",
   "/avatars/piano-avatar.png",
   "/avatars/piggie-avatar.png",
   "/avatars/pinkMonster-avatar.png",
   "/avatars/pretzels-avatar.png",
   "/avatars/rockMonster-avatar.png",
   "/avatars/rudolf-avatar.png",
   "/avatars/santa-avatar.png",
   "/avatars/scaryGerm-avatar.png",
   "/avatars/skull-avatar.png",
   "/avatars/snowman-avatar.png",
   "/avatars/weirdGhost-avatar.png",
   "/avatars/weirdMonster-avatar.png",
   "/avatars/wizard-avatar.png",
];

function getRandomImage(): string {
   const randomIndex = Math.floor(Math.random() * imageFiles.length);
   return imageFiles[randomIndex];
}

export { imageFiles, getRandomImage };
