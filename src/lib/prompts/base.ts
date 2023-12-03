import { PromptTemplate } from 'langchain/prompts';

export const vibeSwitchTemplate =
  PromptTemplate.fromTemplate(`Given a description of an image, suggest a transformation of the image to switch its vibe/atmosphere entirely, while keeping the main contents of the image intact. Be creative, and turn your temperature up. Then give a word or two summing up the changed vibe.

Some examples of transformations include:
Description of image: The image features a man wearing a suit, a tie, and a bowler hat, with a green apple strapped to his face. The man appears to be in an unusual and humorous pose. The apple is strapped to his face, creating a playful and unconventional appearance. This image captures a lighthearted and entertaining atmosphere.
Vibe switch: Transform the setting to a surreal, dream-like landscape, possibly with floating geometric shapes or a starry night sky in the background. Alter the lighting to a soft, ethereal glow, and the colors to a more muted, monochrome palette to give it a mysterious and intriguing feel. The man's suit and bowler hat can be reimagined in a Victorian or steampunk style, adding intricate details and textures to enhance the surreal effect. The apple, still strapped to his face, could be altered to resemble a vintage, clockwork-style orb or a glowing mystical object. This transformation would shift the atmosphere from lighthearted and humorous to mystical, intriguing, and slightly eerie, maintaining the original elements but presenting them in a completely different emotional context.
Transformation: Dream Like

Description of image: The image depicts a sunny day in Paris, with a view of the iconic Eiffel Tower. The tower is an impressive structure, standing tall against a blue sky. The scene is bustling with activity, as numerous people can be seen walking around and enjoying the view of the iconic landmark. The atmosphere in the image is lively, with people of various ages, shapes, and sizes, creating a vibrant and bustling atmosphere. The combination of the beautiful Eiffel Tower and the lively surroundings creates a memorable and captivating sight for tourists and locals alike.
Vibe switch: Transform the scene into a tranquil, moonlit night in Paris. The Eiffel Tower, now illuminated with soft, twinkling lights, stands majestically against a backdrop of a starry night sky. The bustling crowd is replaced with a few silhouettes of couples and individuals strolling leisurely or sitting on nearby benches, enjoying the peaceful ambiance. The lively daytime atmosphere shifts to a serene and romantic night scene, with the moon's reflection glimmering on the Seine River. Add subtle elements like a gentle mist hovering over the ground and distant lights from the city, giving the whole scene a dreamy, enchanting quality that contrasts sharply with the daytime vibrancy.
Transformation: Tranquil and Romantic

Description of image: The image depicts a group of people gathered in a room, sitting around a long dining table. The room has a brick wall, and the ceiling has exposed beams. The people are engaged in conversation, with some sitting on chairs and others standing. The atmosphere appears to be casual and friendly, as the group appears to be enjoying each other's company.
Vibe switch: Change the scene to a sophisticated, elegant evening dinner party. The room's brick wall could be adorned with tasteful art and dimly lit with elegant wall sconces, creating a more intimate and refined atmosphere. The exposed beams in the ceiling can be enhanced with subtle uplighting, adding to the ambiance. The people, originally in casual attire, could be reimagined in formal evening wear, with the men in suits and the women in gowns. The dining table, now set with fine china, crystal glassware, and an elegant centerpiece, reflects a more formal and upscale dining experience. The conversation and interactions can be altered to reflect a more subdued and polished demeanor, with people engaging in refined conversation, possibly with a string quartet or a pianist providing soft background music. This transformation shifts the atmosphere from casual and friendly to one of sophistication and elegance.
Transformation: Sophisticated
{prevVibe}
In each transformation, adjust elements such as lighting, weather, and additional details to fully convert the mood and essence of the scene, while maintaining the integrity of the original composition. The goal is to retain the fundamental subjects of the image but to present them in a completely different emotional context or time of day, effectively performing a 'vibe switch'. Keep the final description relatively short.

Description of image: {originalDescription}
Vibe switch:`);

export const fewShotExamples = ` Given a description of an image, suggest a transformation of the image to switch its vibe/atmosphere entirely, while keeping the main contents of the image intact. Be creative, and turn your temperature up. Then give a word or two summing up the changed vibe.

Some examples of transformations include:

Description of image: The image features a man wearing a suit, a tie, and a bowler hat, with a green apple strapped to his face. The man appears to be in an unusual and humorous pose. The apple is strapped to his face, creating a playful and unconventional appearance. This image captures a lighthearted and entertaining atmosphere.
Vibe switch: Transform the setting to a surreal, dream-like landscape, possibly with floating geometric shapes or a starry night sky in the background. Alter the lighting to a soft, ethereal glow, and the colors to a more muted, monochrome palette to give it a mysterious and intriguing feel. The man's suit and bowler hat can be reimagined in a Victorian or steampunk style, adding intricate details and textures to enhance the surreal effect. The apple, still strapped to his face, could be altered to resemble a vintage, clockwork-style orb or a glowing mystical object. This transformation would shift the atmosphere from lighthearted and humorous to mystical, intriguing, and slightly eerie, maintaining the original elements but presenting them in a completely different emotional context.
Transformation: Dream Like

Description of image: The image depicts a sunny day in Paris, with a view of the iconic Eiffel Tower. The tower is an impressive structure, standing tall against a blue sky. The scene is bustling with activity, as numerous people can be seen walking around and enjoying the view of the iconic landmark. The atmosphere in the image is lively, with people of various ages, shapes, and sizes, creating a vibrant and bustling atmosphere. The combination of the beautiful Eiffel Tower and the lively surroundings creates a memorable and captivating sight for tourists and locals alike.
Vibe switch: Transform the scene into a tranquil, moonlit night in Paris. The Eiffel Tower, now illuminated with soft, twinkling lights, stands majestically against a backdrop of a starry night sky. The bustling crowd is replaced with a few silhouettes of couples and individuals strolling leisurely or sitting on nearby benches, enjoying the peaceful ambiance. The lively daytime atmosphere shifts to a serene and romantic night scene, with the moon's reflection glimmering on the Seine River. Add subtle elements like a gentle mist hovering over the ground and distant lights from the city, giving the whole scene a dreamy, enchanting quality that contrasts sharply with the daytime vibrancy.
Transformation: Tranquil and Romantic

Description of image: The image depicts a group of people gathered in a room, sitting around a long dining table. The room has a brick wall, and the ceiling has exposed beams. The people are engaged in conversation, with some sitting on chairs and others standing. The atmosphere appears to be casual and friendly, as the group appears to be enjoying each other's company.
Vibe switch: Change the scene to a sophisticated, elegant evening dinner party. The room's brick wall could be adorned with tasteful art and dimly lit with elegant wall sconces, creating a more intimate and refined atmosphere. The exposed beams in the ceiling can be enhanced with subtle uplighting, adding to the ambiance. The people, originally in casual attire, could be reimagined in formal evening wear, with the men in suits and the women in gowns. The dining table, now set with fine china, crystal glassware, and an elegant centerpiece, reflects a more formal and upscale dining experience. The conversation and interactions can be altered to reflect a more subdued and polished demeanor, with people engaging in refined conversation, possibly with a string quartet or a pianist providing soft background music. This transformation shifts the atmosphere from casual and friendly to one of sophistication and elegance.
Transformation: Sophisticated

In each transformation, adjust elements such as lighting, weather, and additional details to fully convert the mood and essence of the scene, while maintaining the integrity of the original composition. The goal is to retain the fundamental subjects of the image but to present them in a completely different emotional context or time of day, effectively performing a 'vibe switch'. Keep the final description relatively short.
`;
