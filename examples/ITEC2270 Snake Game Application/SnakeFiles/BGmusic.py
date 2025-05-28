import pygame, sys, os

def resource_path(relative_path):
	try:
		base_path = sys._MEIPASS
	except Exception:
		base_path = os.path.abspath(".")

	return os.path.join(base_path, relative_path)

pygame.mixer.init()
pygame.mixer.music.load(resource_path("bg_music.mp3"))
pygame.mixer.music.play(-1)
