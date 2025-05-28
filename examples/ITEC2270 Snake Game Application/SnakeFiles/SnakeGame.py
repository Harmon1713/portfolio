import pygame, sys, random, BGmusic, sqlite3, pygame_gui, os
from button import Button
from pygame.math import Vector2

# Function to handle resource pathing especially in bundled applications
def resource_path(relative_path):
	try:
		base_path = sys._MEIPASS # Attempt to get base path when in PyInstaller bundle
	except Exception:
		base_path = os.path.abspath(".") # Fallback to absolute path if not bundled

	return os.path.join(base_path, relative_path)

# Setup database and initialize it with default players
default_players = [("Default", 2, 10), ("Default", 1, 20), ("Default", 1, 10)]
conn = sqlite3.connect('leaderboard.db')
cur = conn.cursor()
cur.execute('CREATE TABLE IF NOT EXISTS Scoreboard (Username TEXT, Score INTEGER, Time INTEGER)')
first = cur.execute('''SELECT * FROM Scoreboard''').fetchall()
if first ==[]:
	cur.executemany('''INSERT INTO Scoreboard VALUES(?,?,?)''', default_players)
conn.commit()
conn.close()

# Snake class that handles snake behaviors and properties
class SNAKE:
	def __init__(self):
		self.body = [Vector2(5,10),Vector2(4,10),Vector2(3,10)]
		self.direction = Vector2(0,0)
		self.new_block = False
		
		# Load images for the snake's various parts
		self.head_up = pygame.image.load(resource_path('head_up.png')).convert_alpha()
		self.head_down = pygame.image.load(resource_path('head_down.png')).convert_alpha()
		self.head_left = pygame.image.load(resource_path('head_left.png')).convert_alpha()
		self.head_right = pygame.image.load(resource_path('head_right.png')).convert_alpha()
		
		self.tail_up = pygame.image.load(resource_path('tail_up.png')).convert_alpha()
		self.tail_down = pygame.image.load(resource_path('tail_down.png')).convert_alpha()
		self.tail_left = pygame.image.load(resource_path('tail_left.png')).convert_alpha()
		self.tail_right = pygame.image.load(resource_path('tail_right.png')).convert_alpha()
	
		self.body_vertical = pygame.image.load(resource_path('body_vertical.png')).convert_alpha()
		self.body_horizontal = pygame.image.load(resource_path('body_horizontal.png')).convert_alpha()

		self.body_tr = pygame.image.load(resource_path('body_tr.png')).convert_alpha()
		self.body_tl = pygame.image.load(resource_path('body_tl.png')).convert_alpha()
		self.body_br = pygame.image.load(resource_path('body_br.png')).convert_alpha()
		self.body_bl = pygame.image.load(resource_path('body_bl.png')).convert_alpha()

		# Load sound effects for various events
		self.crunch_sound = pygame.mixer.Sound(resource_path('chomp.mp3'))
		self.new_high_score_sound = pygame.mixer.Sound(resource_path('new-high-score.mp3'))
		self.level_up_sound = pygame.mixer.Sound(resource_path('level_up.mp3'))
		self.game_over_sound = pygame.mixer.Sound(resource_path('game_over.mp3'))

		self.new = True
	
	# Method to draw the snake on the screen
	def draw_snake(self):
		self.update_head_graphics()
		self.update_tail_graphics()

		for index,block in enumerate(self.body):
			x_pos = int(block.x * cell_size)
			y_pos = int(block.y * cell_size)
			block_rect = pygame.Rect(x_pos,y_pos,cell_size,cell_size)

			if index == 0:
				screen.blit(self.head,block_rect)
			elif index == len(self.body) - 1:
				screen.blit(self.tail,block_rect)
			else:
				previous_block = self.body[index + 1] - block
				next_block = self.body[index - 1] - block
				if previous_block.x == next_block.x:
					screen.blit(self.body_vertical,block_rect)
				elif previous_block.y == next_block.y:
					screen.blit(self.body_horizontal,block_rect)
				else:
					# Handle corners by choosing appropriate body part
					if previous_block.x == -1 and next_block.y == -1 or previous_block.y == -1 and next_block.x == -1:
						screen.blit(self.body_tl,block_rect)
					elif previous_block.x == -1 and next_block.y == 1 or previous_block.y == 1 and next_block.x == -1:
						screen.blit(self.body_bl,block_rect)
					elif previous_block.x == 1 and next_block.y == -1 or previous_block.y == -1 and next_block.x == 1:
						screen.blit(self.body_tr,block_rect)
					elif previous_block.x == 1 and next_block.y == 1 or previous_block.y == 1 and next_block.x == 1:
						screen.blit(self.body_br,block_rect)
	
	# Update the graphics for the snake's head based on the direction of movement
	def update_head_graphics(self):
		head_relation = self.body[1] - self.body[0]
		if head_relation == Vector2(1,0): self.head = self.head_left
		elif head_relation == Vector2(-1,0): self.head = self.head_right
		elif head_relation == Vector2(0,1): self.head = self.head_up
		elif head_relation == Vector2(0,-1): self.head = self.head_down

	# Update the graphics for the snake's tail
	def update_tail_graphics(self):
		tail_relation = self.body[-2] - self.body[-1]
		if tail_relation == Vector2(1,0): self.tail = self.tail_left
		elif tail_relation == Vector2(-1,0): self.tail = self.tail_right
		elif tail_relation == Vector2(0,1): self.tail = self.tail_up
		elif tail_relation == Vector2(0,-1): self.tail = self.tail_down

	# Move the snake by updating positions of the body segments
	def move_snake(self):
		screen.blit(bg, (0,0))
		if self.new_block == True: 
			body_copy = self.body[:]
			body_copy.insert(0,body_copy[0] + self.direction)
			self.body = body_copy[:]
			self.new_block = False
		else:
			body_copy = self.body[:-1]
			body_copy.insert(0,body_copy[0] + self.direction)
			self.body = body_copy[:]
	
	# Add a new block to the snake's body	
	def add_block(self):
		self.new_block = True

	# Play sound effects
	def play_crunch_sound(self):
		self.crunch_sound.play()
	
	def play_level_up_sound(self):
		self.level_up_sound.play()

	def play_new_high_score_sound(self):
		if self.new:
			self.new_high_score_sound.play()
			self.new = False

	def play_game_over_sound(self):
		self.game_over_sound.play()
	
	# Reset the snake to its initial state	
	def reset(self):
		self.new = True
		self.body = [Vector2(5,10),Vector2(4,10),Vector2(3,10)]
		self.direction = Vector2(0,0)

# Fruit class that handles the placement and properties of fruit objects
class FRUIT:
	def __init__(self):
		self.randomize()

	# Draw the fruit on the screen
	def draw_fruit(self):
		fruit_rect = pygame.Rect(int(self.pos.x * cell_size),int(self.pos.y * cell_size),cell_size,cell_size)
		screen.blit(apple,fruit_rect)

	# Randomize the position of the fruit, ensuring it doesn't spawn near the bottom edge
	def randomize(self):
		self.x = random.randint(0,cell_number - 1)
		self.y = random.randint(0,cell_number - 1)
		self.pos = Vector2(self.x,self.y)
		if self.y >= cell_number-2:
			self.randomize()

# Main class that handles game logic and integration of different components
class MAIN:
	def __init__(self):	
		self.snake = SNAKE()
		self.fruit = FRUIT()
		self.leveler = 10
		self.scene_change = 5
		self.score_text = 0
	
	# Update game state by moving the snake and checking game conditions
	def update(self):
		self.snake.move_snake()
		self.check_eaten()
		self.check_collision()
	
	# Draw all game elements
	def draw_elements(self):
		self.fruit.draw_fruit()
		self.snake.draw_snake()
		self.out_of_bounds()
		self.draw_score()
		self.draw_high_score()
		self.level_up()
		self.loading_bar()
		self.timer()

	# Check if the snake has eaten a fruit
	def check_eaten(self):
		if self.fruit.pos == self.snake.body[0]:
			self.fruit.randomize()
			self.snake.add_block()
			self.snake.play_crunch_sound()
			if int(self.score_text)%self.leveler == self.leveler-1:
				self.snake.play_level_up_sound()

		for block in self.snake.body[1:]:
			if block == self.fruit.pos:
				self.fruit.randomize()

	# Draw the score on the screen
	def draw_score(self):
		global apple_rect
		self.score_text = str(len(self.snake.body) - 3)		
		score_surface = game_font.render(self.score_text,True,transparent_grey)
		score_x = int(screen_size - 60)
		score_y = int(screen_size - 40)
		score_rect = score_surface.get_rect(center = (score_x,score_y))
		apple_rect = apple.get_rect(midright = (score_rect.left,score_rect.centery))
		bg_rect = pygame.Rect(apple_rect.left,apple_rect.top,apple_rect.width + score_rect.width + 6,apple_rect.height)

		pygame.draw.rect(screen,lime_green,bg_rect)
		screen.blit(score_surface,score_rect)
		screen.blit(apple,apple_rect)
		pygame.draw.rect(screen,transparent_grey,bg_rect,2)
	
	# Check for collisions with the game boundaries or with the snake itself
	def check_collision(self):
		
		# Game boundaries
		if not 0 <= self.snake.body[0].x < cell_number or not 0 <= self.snake.body[0].y < cell_number-2:
			self.snake.play_game_over_sound()
			if int(self.score_text) !=0:
				pygame.event.post(pygame.event.Event(GAME_OVER))
			else: 
				self.snake.reset()
				self.fruit.randomize()
				global counter
				counter = 0
		
		# Snake itself
		for block in self.snake.body[1:]:
			if block == self.snake.body[0]:
				if int(self.score_text) !=0:
					self.snake.play_game_over_sound()
					pygame.event.post(pygame.event.Event(GAME_OVER))
				else: 
					self.snake.reset()

	# Draw a gray rectangle at the bottom of the game screen to display stats
	def out_of_bounds(self):
		oob_rect = pygame.Rect(0, screen_size - 80, screen_size, 80)
		pygame.draw.rect(screen,dark_grey,oob_rect)

	# Draw the current high score
	def draw_high_score(self):
		global bg_rect

		# Grab top scorer from the database - based on score only, not time
		conn = sqlite3.connect('leaderboard.db')
		cur = conn.cursor()
		cur.execute('SELECT * FROM Scoreboard ORDER BY Score DESC')
		top = cur.fetchone()
		high_score = top[1]
		
		conn.close()

		if int(self.score_text) > high_score:
			high_score = int(self.score_text)

			self.snake.play_new_high_score_sound()
			score_surface = game_font.render("High Score: " + str(high_score),True,transparent_grey)
			score_x = int(156)
			score_y = int(screen_size - 35)
			score_rect = score_surface.get_rect(center = (score_x,score_y))
			bg_rect = pygame.Rect(score_rect.left-6,score_rect.top-6,score_rect.width+12,score_rect.height+6)
			pygame.draw.rect(screen,lime_green,bg_rect)
			screen.blit(score_surface,score_rect)
			pygame.draw.rect(screen,transparent_grey,bg_rect,2)
		else:	
			score_surface = game_font.render("High Score: " + str(high_score),True,transparent_grey)
			score_x = int(156)
			score_y = int(screen_size - 35)
			score_rect = score_surface.get_rect(center = (score_x,score_y))
			bg_rect = pygame.Rect(score_rect.left-6,score_rect.top-6,score_rect.width+12,score_rect.height+6)
			pygame.draw.rect(screen,lime_green,bg_rect)
			screen.blit(score_surface,score_rect)
			pygame.draw.rect(screen,transparent_grey,bg_rect,2)

	# Increment the level and trigger scene changes
	def level_up(self):
		global level, lvl_rect

		level = (int(self.score_text)//self.leveler)+1

		if level//self.scene_change == 1:
			pygame.event.post(pygame.event.Event(SCENE))


		level_surface = game_font.render("Level: " + str(level),True,transparent_grey)
		level_x = bg_rect.right + 2*cell_size
		level_y = bg_rect.bottom - cell_size/2.9
		level_rect = level_surface.get_rect(center = (level_x,level_y))
		lvl_rect = pygame.Rect(level_rect.left-6,level_rect.top-6,level_rect.width+12,level_rect.height+6)
		pygame.draw.rect(screen,lime_green,lvl_rect)
		screen.blit(level_surface,level_rect)
		pygame.draw.rect(screen,transparent_grey,lvl_rect,2)

	# Visual representation of the progress towards the next level
	def loading_bar(self):
			loading = (int(self.score_text)/self.leveler) - (level - 1)
			
			outside_rect = pygame.Rect(lvl_rect.right+(cell_size*0.5),lvl_rect.top,lvl_rect.width,lvl_rect.height)
			pygame.draw.rect(screen,apple_red,outside_rect,2)

			inside_rect = pygame.Rect(outside_rect.left,outside_rect.top,outside_rect.width*(loading),outside_rect.height)
			pygame.draw.rect(screen,apple_red,inside_rect)

	# Update the timer and display it on the screen
	def timer(self):
		elapsed_time = counter//one_second
		timer_surface = game_font.render(str(elapsed_time), True, apple_red)
		
		level_x = apple_rect.left - cell_size*0.75
		level_y = apple_rect.centery + 5
		timer_rect = timer_surface.get_rect(center = (level_x,level_y))
		screen.blit(timer_surface, timer_rect)
		return elapsed_time

# Initialize Pygame and set up the main window
pygame.mixer.pre_init(44100,-16,2,512)
pygame.init()
cell_size = 40
cell_number = 20
screen_size = cell_size*cell_number

# Define commonly used colors
apple_red = (225,60,15)
lime_green = (167,209,61)
transparent_grey = (56,74,12)
dark_grey = (45,45,45)
off_white = "#d7fcd4"

screen = pygame.display.set_mode((screen_size,screen_size))
clock = pygame.time.Clock()

apple = pygame.image.load(resource_path('apple.png')).convert_alpha()
game_font = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 25)
bg = pygame.image.load(resource_path("grass.jpg"))
win_icon = pygame.image.load(resource_path("head_down.png"))
pygame.display.set_icon(win_icon)
pygame.display.set_caption("Snake Game")

# Define user events
SCREEN_UPDATE = pygame.USEREVENT + 1
pygame.time.set_timer(SCREEN_UPDATE, 100)

SCENE = pygame.USEREVENT + 2
GAME_OVER = pygame.USEREVENT + 3

# Setup GUI manager for handling UI elements
MANAGER = pygame_gui.UIManager((screen_size, screen_size))
UI_REFRESH_RATE = clock.tick(60)/1000

main_game = MAIN()
screen.blit(bg, (0, 0))

# For the timer
counter = 0
one_second = 10

# For the various display pages
run = True
hello = False
player_initialize = True
main_menu = False
pause_menu = False
leaderboard_menu = False

# For the username
text_input = pygame_gui.elements.UITextEntryLine(relative_rect=pygame.Rect((300, 425), (200, 50)), 
												 manager=MANAGER, object_id='#player_name')

# Main game loop
while True:
	global username
	# Run game if not game over
	if run:
		# First page when launched
		if player_initialize:
			pygame.mouse.set_visible(True)
			screen.blit(bg, (0, 0))	

			# Welcome message and guidance
			START_TEXT = game_font.render("Welcome to the Snake Game!", True, apple_red)
			START_RECT = START_TEXT.get_rect(center=(screen_size/2, 100))
			screen.blit(START_TEXT, START_RECT)
			
			snake_image = pygame.image.load(resource_path('head_down.png'))
			snake_image = pygame.transform.scale(snake_image, (100,100))
			screen.blit(snake_image, [350,200])

			START_TEXT = game_font.render("Who is playing?", True, apple_red)
			START_RECT = START_TEXT.get_rect(center=(screen_size/2, 375))
			screen.blit(START_TEXT, START_RECT)
			
			START_TEXT = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 15).render("Enter a username up to 17 characters and click Enter, or click Default", True, 'black')
			START_RECT = START_TEXT.get_rect(center=(screen_size/2, 500))
			screen.blit(START_TEXT, START_RECT)

			DEFAULT_MOUSE_POS = pygame.mouse.get_pos()

			# Initialize buttons for lunch page with their respective functionality
			DEFAULT_BUTTON = Button(pygame.image.load(resource_path("enter.jpg")), (225, 450), 
								"DEFAULT", pygame.font.Font(resource_path('Microsport_Bold.ttf'), 15), off_white, 'black')
			
			ENTER_BUTTON = Button(pygame.image.load(resource_path("enter.jpg")), (575, 450), 
								"ENTER", pygame.font.Font(resource_path('Microsport_Bold.ttf'), 15), off_white, 'black')

			# Hover changes color of button text
			for button in [DEFAULT_BUTTON, ENTER_BUTTON]:
				button.changeColor(DEFAULT_MOUSE_POS)
				button.update(screen)
			
			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()
				
				# Button clicks get username
				if event.type == pygame.MOUSEBUTTONDOWN:
					if ENTER_BUTTON.checkForInput(DEFAULT_MOUSE_POS):
						username = text_input.get_text()[:17]
						text_input.hide()
						hello = True
						player_initialize = False
					if DEFAULT_BUTTON.checkForInput(DEFAULT_MOUSE_POS):
						username = 'DEFAULT'
						text_input.hide()
						hello = True
						player_initialize = False

				MANAGER.process_events(event)
		
		# Confirms username and gives instructions
		if hello:
			screen.blit(bg, (0, 0))
			username_text = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 40).render(f"Hello, {username} :)", True, apple_red)
			username_text_rect = username_text.get_rect(center=(screen_size/2, 100))
			screen.blit(username_text, username_text_rect)

			wasd_image = pygame.image.load(resource_path('WASD.png'))
			wasd_image = pygame.transform.scale(wasd_image, (150,150))
			screen.blit(wasd_image, [325, 200])
			
			INSTRUCTIONS_TEXT1 = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 25).render("Use WASD to move your snake", True, 'black')
			INSTRUCTIONS_RECT1 = INSTRUCTIONS_TEXT1.get_rect(center=(400, 375))
			screen.blit(INSTRUCTIONS_TEXT1, INSTRUCTIONS_RECT1)

			INSTRUCTIONS_TEXT2 = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 25).render("and collect apples.", True, 'black')
			INSTRUCTIONS_RECT2 = INSTRUCTIONS_TEXT2.get_rect(center=(400, 410))
			screen.blit(INSTRUCTIONS_TEXT2, INSTRUCTIONS_RECT2)

			INSTRUCTIONS_TEXT3 = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 25).render("If you touch the borders or your body,", True, 'black')
			INSTRUCTIONS_RECT3 = INSTRUCTIONS_TEXT3.get_rect(center=(400, 445))
			screen.blit(INSTRUCTIONS_TEXT3, INSTRUCTIONS_RECT3)

			INSTRUCTIONS_TEXT4 = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 25).render("the game is over.", True, 'black')
			INSTRUCTIONS_RECT4 = INSTRUCTIONS_TEXT4.get_rect(center=(400, 480))
			screen.blit(INSTRUCTIONS_TEXT4, INSTRUCTIONS_RECT4)

			FUN_TEXT = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 25).render("Press space to pause.", True, 'black')
			FUN_RECT = FUN_TEXT.get_rect(center=(400, 540))
			screen.blit(FUN_TEXT, FUN_RECT)

			FUN_TEXT2 = pygame.font.Font(resource_path('Microsport_Bold.ttf'), 40).render("Have fun!", True, apple_red)
			FUN_RECT2 = FUN_TEXT2.get_rect(center=(400, 600))
			screen.blit(FUN_TEXT2, FUN_RECT2)

			pygame.display.update()
			pygame.time.wait(4000) # Automatically changes to main menu after 4 seconds
			main_menu = True
			screen.blit(bg, (0, 0))
			hello = False

		# Main menu with Play, Leaderboard, and Quit buttons
		if main_menu: 
			pygame.mouse.set_visible(True)
			global PLAY_BUTTON, LEADERBOARD_BUTTON, QUIT_BUTTON, MENU_MOUSE_POS
			MENU_MOUSE_POS = pygame.mouse.get_pos()

			MENU_TEXT = game_font.render("MAIN MENU", True, apple_red)
			MENU_RECT = MENU_TEXT.get_rect(center=(screen_size/2, 100))

			# Initialize buttons for main menu with their respective functionality
			PLAY_BUTTON = Button(pygame.image.load(resource_path("play_rect.png")), (screen_size/2, screen_size/2 - 150), 
								"PLAY", game_font, off_white, apple_red)
			LEADERBOARD_BUTTON = Button(pygame.image.load(resource_path("options_rect.png")), (screen_size/2, screen_size/2), 
								"LEADERBOARD", game_font, off_white, apple_red)
			QUIT_BUTTON = Button(pygame.image.load(resource_path("quit_rect.png")), (screen_size/2, screen_size/2 + 150), 
								"QUIT", game_font, off_white, apple_red)

			screen.blit(MENU_TEXT, MENU_RECT)

			# Hover changes color of button text
			for button in [PLAY_BUTTON, LEADERBOARD_BUTTON, QUIT_BUTTON]:
				button.changeColor(MENU_MOUSE_POS)
				button.update(screen)

			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()

				# Button clicks change display accordingly
				if event.type == pygame.MOUSEBUTTONDOWN:
					if PLAY_BUTTON.checkForInput(MENU_MOUSE_POS):
						counter = 0
						main_game.snake.reset()
						main_menu = False
					if LEADERBOARD_BUTTON.checkForInput(MENU_MOUSE_POS):
						main_menu = False
						screen.blit(bg, (0, 0))
						leaderboard_menu = True
					if QUIT_BUTTON.checkForInput(MENU_MOUSE_POS):
						pygame.quit()
						sys.exit()

		#Pause menu for when players hit the space bar while playing
		if pause_menu:
			pygame.mouse.set_visible(True) 
			global RESUME_BUTTON, END_BUTTON
			MENU_MOUSE_POS = pygame.mouse.get_pos()

			MENU_TEXT = game_font.render("PAUSE MENU", True, apple_red)
			MENU_RECT = MENU_TEXT.get_rect(center=(screen_size/2, 100))

			# Buttons for pause menu
			RESUME_BUTTON = Button(pygame.image.load(resource_path("play_rect.png")), (screen_size/2, screen_size/2 - 150), 
								"RESUME", game_font, off_white, apple_red)
			END_BUTTON = Button(pygame.image.load(resource_path("quit_rect.png")), (screen_size/2, screen_size/2 + 150), 
								"END GAME", game_font, off_white, apple_red)

			screen.blit(MENU_TEXT, MENU_RECT)

			# Hover changes color of button text
			for button in [RESUME_BUTTON, END_BUTTON]:
				button.changeColor(MENU_MOUSE_POS)
				button.update(screen)

			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()
				
				# Button clicks change display accordingly
				if event.type == pygame.MOUSEBUTTONDOWN:
					if RESUME_BUTTON.checkForInput(MENU_MOUSE_POS):
						pause_menu = False
					if END_BUTTON.checkForInput(MENU_MOUSE_POS):
						pause_menu = False
						screen.blit(bg, (0, 0))
						main_menu = True
		
		# Shows top three scores, with time being the tie breaker
		if leaderboard_menu:
			pygame.mouse.set_visible(True) 
			MENU_MOUSE_POS = pygame.mouse.get_pos()

			MENU_TEXT = game_font.render("Top 3 Players", True, apple_red)
			MENU_RECT = MENU_TEXT.get_rect(center=(screen_size/2, 100))
			screen.blit(MENU_TEXT, MENU_RECT)		
			
			i = 35 # Vertical space between entries
			column_space = 400 # Horizontal space between stats

			# Render header labels for player information
			head1 = game_font.render('PLAYER', True, apple_red)
			head2 = game_font.render('SCORE', True, apple_red)
			head3 = game_font.render('TIME', True, apple_red)
			screen.blit(head1, [50, 200])
			screen.blit(head2, [50 + column_space, 200])
			screen.blit(head3, [50 + 1.5*column_space, 200])
			
			# Fetch top 3 players from database and display their data
			conn = sqlite3.connect('leaderboard.db')
			cur = conn.cursor()
			cur.execute('SELECT * FROM Scoreboard ORDER BY Score DESC, Time ASC') # Time breaks ties in score
			top3 = cur.fetchmany(3)
			for row in top3:
				column1 = game_font.render(f'{row[0]}', True, apple_red)
				column2 = game_font.render(f'{row[1]}', True, apple_red)
				column3 = game_font.render(f'{row[2]}', True, apple_red)
				screen.blit(column1, [50, 225 + i])
				screen.blit(column2, [75 + column_space, 225 + i])
				screen.blit(column3, [75 + 1.5*column_space, 225 + i])

				i += 50
			conn.close()

			# Main menu button and functionality
			MAIN_MENU_BUTTON = Button(pygame.image.load(resource_path("play_rect.png")), (screen_size/2, screen_size-200), 
								"MAIN MENU", game_font, off_white, apple_red)
			
			for button in [MAIN_MENU_BUTTON]:
				button.changeColor(MENU_MOUSE_POS)
				button.update(screen)

			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()

				if event.type == pygame.MOUSEBUTTONDOWN:
					if MAIN_MENU_BUTTON.checkForInput(MENU_MOUSE_POS):
						leaderboard_menu = False
						screen.blit(bg, (0, 0))
						main_menu = True
		
		# Happenings during game play
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()

			if event.type == SCREEN_UPDATE:
				counter += 1
				
				main_game.update()

			MANAGER.process_events(event)
	
			# Keyboard input
			if event.type == pygame.KEYDOWN:
				# Snake movements WASD
				if event.key == pygame.K_w: 
					if main_game.snake.direction.y != 1:
						main_game.snake.direction = Vector2(0,-1)
				if event.key == pygame.K_s:
					if main_game.snake.direction.y != -1:
						main_game.snake.direction = Vector2(0,1)
				if event.key == pygame.K_a:
					if main_game.snake.direction.x != 1:
						main_game.snake.direction = Vector2(-1,0)
				if event.key == pygame.K_d:
					if main_game.snake.direction.x != -1:
						main_game.snake.direction = Vector2(1,0)

				# Pause menu
				if event.key == pygame.K_SPACE:
					pause_menu = True

			# Change to ocean background after conditions met
			if event.type == SCENE:
				bg = pygame.image.load(resource_path("ocean.png"))

			# Save score and time for game over, trigger game over screen
			if event.type == GAME_OVER:
				global score
				score = int(len(main_game.snake.body) - 3)
				time = main_game.timer()
				player = [username, score, time]
				conn = sqlite3.connect('leaderboard.db')
				cur = conn.cursor()
				cur.execute('INSERT INTO Scoreboard VALUES(?,?,?)', player)
				conn.commit()
				conn.close()
				main_game.snake.reset()
				screen.blit(bg, (0, 0))
				run = False

	# Game over screen
	else:
		pygame.mouse.set_visible(True)

		MENU_MOUSE_POS = pygame.mouse.get_pos()

		MENU_TEXT = game_font.render(f"GAME OVER, {username}! Score: {score}", True, apple_red)
		MENU_RECT = MENU_TEXT.get_rect(center=(screen_size/2, 100))

		# Buttons and respective funcitonality
		AGAIN_BUTTON = Button(pygame.image.load(resource_path("play_rect.png")), (screen_size/2, screen_size/2 - 150), 
							"NEW GAME", game_font, off_white, apple_red)
		MAIN_MENU_BUTTON = Button(pygame.image.load(resource_path("play_rect.png")), (screen_size/2, screen_size/2), 
					"MAIN MENU", game_font, off_white, apple_red)
		QUIT_BUTTON = Button(pygame.image.load(resource_path("play_rect.png")), (screen_size/2, screen_size/2 + 150), 
							"QUIT", game_font, off_white, apple_red)

		screen.blit(MENU_TEXT, MENU_RECT)

		for button in [AGAIN_BUTTON, MAIN_MENU_BUTTON, QUIT_BUTTON]:
			button.changeColor(MENU_MOUSE_POS)
			button.update(screen)

		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()

			if event.type == pygame.MOUSEBUTTONDOWN:
				if AGAIN_BUTTON.checkForInput(MENU_MOUSE_POS):
					bg = pygame.image.load(resource_path("grass.jpg"))
					counter = 0
					main_game.snake.reset()
					run = True
				if MAIN_MENU_BUTTON.checkForInput(MENU_MOUSE_POS):
					screen.blit(bg, (0, 0))
					run = True
					main_menu = True
				if QUIT_BUTTON.checkForInput(MENU_MOUSE_POS):
					pygame.quit()
					sys.exit()

	# Only run game if there isn't a menu on the screen and it isn't game over
	if player_initialize == False and hello == False and main_menu == False and pause_menu == False and leaderboard_menu == False and run == True:
		pygame.mouse.set_visible(False)
		main_game.draw_elements()
	
	MANAGER.update(UI_REFRESH_RATE)
	MANAGER.draw_ui(screen)
	pygame.display.update()
	clock.tick(80)