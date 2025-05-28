import tkinter as tk
from tkinter import messagebox
from datetime import datetime, timedelta
import sqlite3
import os, sys

def resource_path(relative_path):
	try:
		base_path = sys._MEIPASS
	except Exception:
		base_path = os.path.abspath(".")

	return os.path.join(base_path, relative_path)

class GiraffeWarmerMaintenanceApp:
    def __init__(self, root):
        self.root = root
        self.root.title("GE Giraffe Warmer Maintenance")

		# Set the icon
        icon_path = resource_path('giraffe-face-rbg.ico')
        self.root.iconbitmap(icon_path)
        
        self.create_database()
        self.insert_initial_data()
        self.create_widgets()
        self.update_serial_list()

    def create_database(self):
        self.conn = sqlite3.connect('giraffe_warmer_maintenance.db')
        self.cursor = self.conn.cursor()

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS serial_numbers (
                                serial TEXT PRIMARY KEY,
                                last_maintenance TEXT,
                                next_maintenance TEXT,
                                retired BOOLEAN)''')

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS logs (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                serial TEXT,
                                date TEXT,
                                action TEXT)''')

        self.conn.commit()

    def insert_initial_data(self):
        initial_data = {
            "SN001": {"last_maintenance": "2023-06-01", "next_maintenance": "2024-06-01", "retired": False},
            "SN002": {"last_maintenance": "2023-05-15", "next_maintenance": "2024-05-15", "retired": False},
            "SN003": {"last_maintenance": "2023-04-01", "next_maintenance": "2024-04-01", "retired": False},
            "SN004": {"last_maintenance": "2023-03-15", "next_maintenance": "2024-03-15", "retired": False},
            "SN005": {"last_maintenance": "2023-04-01", "next_maintenance": "2024-04-01", "retired": False},
            "SN006": {"last_maintenance": "2023-05-15", "next_maintenance": "2024-05-15", "retired": False},
            "SN007": {"last_maintenance": "2023-07-01", "next_maintenance": "2024-07-01", "retired": False},
            "SN008": {"last_maintenance": "2023-07-15", "next_maintenance": "2024-07-15", "retired": False},
            "SN009": {"last_maintenance": "2023-06-01", "next_maintenance": "2024-06-01", "retired": True},
            "SN010": {"last_maintenance": "2023-05-15", "next_maintenance": "2024-05-15", "retired": False},
            "SN011": {"last_maintenance": "2023-04-01", "next_maintenance": "2024-04-01", "retired": False},
            "SN012": {"last_maintenance": "2023-03-15", "next_maintenance": "2024-03-15", "retired": False},
            "SN013": {"last_maintenance": "2023-04-01", "next_maintenance": "2024-04-01", "retired": True},
            "SN014": {"last_maintenance": "2023-05-15", "next_maintenance": "2024-05-15", "retired": False},
            "SN015": {"last_maintenance": "2023-07-01", "next_maintenance": "2024-07-01", "retired": False},
            "SN016": {"last_maintenance": "2023-07-15", "next_maintenance": "2024-07-15", "retired": False},
        }

        for serial, data in initial_data.items():
            self.cursor.execute("INSERT OR IGNORE INTO serial_numbers VALUES (?, ?, ?, ?)",
                                (serial, data["last_maintenance"], data["next_maintenance"], data["retired"]))
        self.conn.commit()

    def create_widgets(self):
        # Buttons for filtering and maintenance actions (above serial list)
        self.filter_frame_top = tk.Frame(self.root)
        self.filter_frame_top.pack(pady=10)

        self.show_all_button = tk.Button(self.filter_frame_top, text="Show All", command=self.show_all)
        self.show_all_button.grid(row=0, column=0, padx=5)

        self.show_due_button = tk.Button(self.filter_frame_top, text="Show Due Maintenance", command=self.show_due)
        self.show_due_button.grid(row=0, column=1, padx=5)

		# Serial numbers list and scrollbar
        self.serial_list_frame = tk.Frame(self.root)
        self.serial_list_frame.pack(pady=10)

        self.serial_listbox = tk.Listbox(self.serial_list_frame, width=50, height=10)
        self.serial_listbox.grid(row=1, column=0, padx=5, pady=5, sticky="nsew")

        self.serial_scrollbar = tk.Scrollbar(self.serial_list_frame, orient=tk.VERTICAL)
        self.serial_scrollbar.grid(row=1, column=1, sticky="ns")

        self.serial_listbox.config(yscrollcommand=self.serial_scrollbar.set)
        self.serial_scrollbar.config(command=self.serial_listbox.yview)

        # Frame for buttons (right of serial list)
        self.button_frame = tk.Frame(self.serial_list_frame)
        self.button_frame.grid(row=1, column=2, padx=10, pady=5, sticky="nsew")

        self.add_serial_button = tk.Button(self.button_frame, text="Add Serial Number", command=self.add_serial)
        self.add_serial_button.pack(side=tk.TOP, pady=5)

        self.reactivate_button = tk.Button(self.button_frame, text="Reactivate Serial Number", command=self.reactivate_serial)
        self.reactivate_button.pack(side=tk.TOP, pady=5)

        self.retire_button = tk.Button(self.button_frame, text="Retire Serial Number", command=self.retire_serial)
        self.retire_button.pack(side=tk.TOP, pady=5)

        self.delete_serial_button = tk.Button(self.button_frame, text="Delete Serial Number", command=self.delete_serial)
        self.delete_serial_button.pack(side=tk.TOP, pady=5)
        
        # Log frame
        self.view_logs_frame = tk.Frame(self.root)
        self.view_logs_frame.pack(pady=10)

        self.view_all_logs_button = tk.Button(self.view_logs_frame, text="View All Logs", command=self.view_all_logs)
        self.view_all_logs_button.pack(side=tk.LEFT, padx=5)

        self.view_serial_logs_button = tk.Button(self.view_logs_frame, text="View Serial Logs", command=self.view_serial_logs)
        self.view_serial_logs_button.pack(side=tk.LEFT, padx=5)

        # Maintenance frame
        self.maintenance_frame = tk.Frame(self.root)
        self.maintenance_frame.pack(pady=10)

        self.maintenance_button = tk.Button(self.maintenance_frame, text="Perform Maintenance", command=self.perform_maintenance)
        self.maintenance_button.pack()

    def update_serial_list(self):
        self.serial_listbox.delete(0, tk.END)
        self.cursor.execute("SELECT * FROM serial_numbers")
        serial_numbers = self.cursor.fetchall()
        for serial, last_maintenance, next_maintenance, retired in serial_numbers:
            if retired:
                display_text = f"{serial} - Retired"
                self.serial_listbox.insert(tk.END, display_text)
            else:
                display_text = f"{serial} - Next Maintenance: {next_maintenance}"
                if datetime.strptime(next_maintenance, "%Y-%m-%d") < datetime.now():
                    self.serial_listbox.insert(tk.END, display_text)
                    self.serial_listbox.itemconfig(tk.END, {'fg': 'red'})
                else:
                    self.serial_listbox.insert(tk.END, display_text)

    def show_all(self):
        self.update_serial_list()

    def show_due(self):
        self.serial_listbox.delete(0, tk.END)
        self.cursor.execute("SELECT * FROM serial_numbers WHERE retired = 0")
        serial_numbers = self.cursor.fetchall()
        for serial, last_maintenance, next_maintenance, retired in serial_numbers:
            if datetime.strptime(next_maintenance, "%Y-%m-%d") < datetime.now():
                display_text = f"{serial} - Next Maintenance: {next_maintenance}"
                self.serial_listbox.insert(tk.END, display_text)
                self.serial_listbox.itemconfig(tk.END, {'fg': 'red'})

    def add_serial(self):
        add_window = tk.Toplevel(self.root)
        add_window.title("Add Serial Number")
        add_window.geometry("300x250")
        
		# Set the icon
        icon_path = resource_path('giraffe-face-rbg.ico')
        add_window.iconbitmap(icon_path)

        tk.Label(add_window, text="Serial Number:").pack(pady=5)
        serial_entry = tk.Entry(add_window)
        serial_entry.pack(pady=5)

        tk.Label(add_window, text="Last Maintenance (YYYY-MM-DD):").pack(pady=5)
        last_maintenance_entry = tk.Entry(add_window)
        last_maintenance_entry.pack(pady=5)

        tk.Label(add_window, text="Next Maintenance (YYYY-MM-DD):").pack(pady=5)
        next_maintenance_entry = tk.Entry(add_window)
        next_maintenance_entry.pack(pady=5)

        def save_new_serial():
            serial = serial_entry.get()
            last_maintenance = last_maintenance_entry.get()
            next_maintenance = next_maintenance_entry.get()

            # Check if serial number already exists
            self.cursor.execute("SELECT * FROM serial_numbers WHERE serial=?", (serial,))
            existing_serial = self.cursor.fetchone()
            if existing_serial:
                messagebox.showerror("Error", f"Serial number '{serial}' already exists.")
                return

            # Check if last maintenance date is in the future
            try:
                last_maintenance_date = datetime.strptime(last_maintenance, "%Y-%m-%d")
                if last_maintenance_date > datetime.now():
                    messagebox.showerror("Error", "Last maintenance date cannot be in the future.")
                    return
            except ValueError:
                messagebox.showerror("Error", "Invalid date format for Last Maintenance. Use YYYY-MM-DD.")
                return

            # Check if next maintenance date is exactly one year from last maintenance
            try:
                next_maintenance_date = datetime.strptime(next_maintenance, "%Y-%m-%d")
                if next_maintenance_date != last_maintenance_date + timedelta(days=365):
                    override = messagebox.askyesno("Override Confirmation", "Next maintenance date is not exactly one year from Last Maintenance. Do you want to override this check?")
                    if not override:
                        return
            except ValueError:
                messagebox.showerror("Error", "Invalid date format for Next Maintenance. Use YYYY-MM-DD.")
                return

            # If all checks pass (or if overridden), proceed with saving the serial number
            self.cursor.execute("INSERT INTO serial_numbers VALUES (?, ?, ?, ?)", (serial, last_maintenance, next_maintenance, False))
            self.cursor.execute("INSERT INTO logs (serial, date, action) VALUES (?, ?, ?)", (serial, datetime.now().strftime("%Y-%m-%d"), "Added"))
            self.conn.commit()
            self.update_serial_list()
            add_window.destroy()

        tk.Button(add_window, text="Save", command=save_new_serial).pack(pady=10)



    def retire_serial(self):
        selected = self.serial_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Select a serial number to retire.")
            return

        serial = self.serial_listbox.get(selected).split(" ")[0]
        self.cursor.execute("SELECT retired FROM serial_numbers WHERE serial = ?", (serial,))
        retired = self.cursor.fetchone()[0]
        if retired:
            messagebox.showinfo("Info", "Serial number is already retired.")
            return

        self.cursor.execute("UPDATE serial_numbers SET retired = 1 WHERE serial = ?", (serial,))
        self.cursor.execute("INSERT INTO logs (serial, date, action) VALUES (?, ?, ?)", (serial, datetime.now().strftime("%Y-%m-%d"), "Retired"))
        self.conn.commit()
        self.update_serial_list()

    def reactivate_serial(self):
        selected = self.serial_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Select a serial number to reactivate.")
            return

        serial = self.serial_listbox.get(selected).split(" ")[0]
        self.cursor.execute("SELECT retired FROM serial_numbers WHERE serial = ?", (serial,))
        retired = self.cursor.fetchone()[0]
        if not retired:
            messagebox.showinfo("Info", "Serial number is already active.")
            return

        self.cursor.execute("UPDATE serial_numbers SET retired = 0 WHERE serial = ?", (serial,))
        self.cursor.execute("INSERT INTO logs (serial, date, action) VALUES (?, ?, ?)", (serial, datetime.now().strftime("%Y-%m-%d"), "Reactivated"))
        self.conn.commit()
        self.update_serial_list()

    def delete_serial(self):
        selected = self.serial_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Select a serial number to delete.")
            return

        serial = self.serial_listbox.get(selected).split(" ")[0]
        if messagebox.askyesno("Confirm Delete", f"Are you sure you want to delete serial number {serial}?"):
            self.cursor.execute("DELETE FROM serial_numbers WHERE serial = ?", (serial,))
            self.cursor.execute("INSERT INTO logs (serial, date, action) VALUES (?, ?, ?)", (serial, datetime.now().strftime("%Y-%m-%d"), "Deleted"))
            self.conn.commit()
            self.update_serial_list()

    def view_all_logs(self):
        self.view_logs()

    def view_serial_logs(self):
        selected = self.serial_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Select a serial number to view logs.")
            return
        serial = self.serial_listbox.get(selected).split(" ")[0]
        self.view_logs(serial)

    def view_logs(self, serial=None):
        logs_window = tk.Toplevel(self.root)
        logs_window.title("Maintenance Logs")
        logs_window.geometry("600x400")
        # Set the icon
        icon_path = resource_path('giraffe-face-rbg.ico')
        logs_window.iconbitmap(icon_path)

        logs_listbox = tk.Listbox(logs_window, width=80, height=20)
        logs_listbox.pack(pady=10)

        if serial:
            serial_logs = [log for log in self.cursor.execute("SELECT * FROM logs WHERE serial = ?", (serial,))]
            for log in serial_logs:
                log_text = f"{log[2]} - {log[3]}"
                if "Failed" in log[3]:
                    logs_listbox.insert(tk.END, log_text)
                    logs_listbox.itemconfig(tk.END, {'fg': 'red'})
                else:
                    logs_listbox.insert(tk.END, log_text)
        else:
            for log in self.cursor.execute("SELECT * FROM logs"):
                log_text = f"{log[1]} - {log[2]} - {log[3]}"
                if "Failed" in log[3]:
                    logs_listbox.insert(tk.END, log_text)
                    logs_listbox.itemconfig(tk.END, {'fg': 'red'})
                else:
                    logs_listbox.insert(tk.END, log_text)

    def perform_maintenance(self):
        selected = self.serial_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Select a serial number to perform maintenance.")
            return

        serial = self.serial_listbox.get(selected).split(" ")[0]
        self.cursor.execute("SELECT retired FROM serial_numbers WHERE serial = ?", (serial,))
        retired = self.cursor.fetchone()[0]
        if retired:
            messagebox.showwarning("Warning", "Cannot perform maintenance on a retired serial number. Reactivate first.")
            return

        last_maintenance = datetime.strptime(self.cursor.execute("SELECT last_maintenance FROM serial_numbers WHERE serial = ?", (serial,)).fetchone()[0], "%Y-%m-%d")
        if datetime.now() - last_maintenance < timedelta(days=335):  # 11 months
            if not messagebox.askyesno("Confirm Early Maintenance", "Maintenance is being performed within 11 months of the last maintenance. Do you want to proceed?"):
                return

        self.maintenance_button.pack_forget()

        self.checks = {
            "Calibration Check": {
                "instructions": "Enter the temperture reading at 37°C.",
                "criteria": lambda x: 36.5 <= x <= 37.5,
                "unit": "°C",
                "error_msg": "Measurement should be between 36.5°C and 37.5°C."
            },
            "Software Update": {
                "instructions": "Enter the current software version.",
                "criteria": lambda x: float(x) >= 2.0,
                "unit": "",
                "error_msg": "Software version should be 2.0 or higher."
            },
            "Sensor Check": {
                "instructions": "Enter sensor output readings.",
                "criteria": lambda x: 5.0 <= x <= 10.0,
                "unit": "mV",
                "error_msg": "Sensor output should be between 5.0mV and 10.0mV."
            }
        }

        self.check_entries = {}
        for check_name, check_info in self.checks.items():
            frame = tk.Frame(self.maintenance_frame)
            frame.pack(pady=5)

            tk.Label(frame, text=check_name).grid(row=0, column=0, padx=5)
            tk.Label(frame, text=check_info["instructions"]).grid(row=1, column=0, padx=5)
            
            
            entry = tk.Entry(frame)
            entry.grid(row=1, column=1, padx=5)
            self.check_entries[check_name] = entry

            tk.Label(frame, text=check_info["unit"]).grid(row=1, column=2, padx=5)

            check_button = tk.Button(frame, text="Check", command=lambda cn=check_name: self.check_value(cn))
            check_button.grid(row=1, column=3, padx=5)

        submit_button = tk.Button(self.maintenance_frame, text="Submit Maintenance", command=self.submit_maintenance)
        submit_button.pack(pady=20)

    def check_value(self, check_name):
        value = self.check_entries[check_name].get()
        try:
            value = float(value)
            if self.checks[check_name]["criteria"](value):
                messagebox.showinfo("Check Result", f"{check_name} passed.")
            else:
                messagebox.showwarning("Check Result", self.checks[check_name]["error_msg"])
        except ValueError:
            messagebox.showerror("Error", "Please enter a valid number.")

    def submit_maintenance(self):
        selected = self.serial_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Select a serial number to perform maintenance.")
            return

        serial = self.serial_listbox.get(selected).split(" ")[0]
        log_entry = {"serial": serial, "date": datetime.now().strftime("%Y-%m-%d")}

        all_passed = True
        for check_name, check_info in self.checks.items():
            value = self.check_entries[check_name].get()
            if value == "":
                messagebox.showwarning("Warning", "Please enter all fields.")
                return

            try:
                value = float(value)
                if self.checks[check_name]["criteria"](value):
                    log_entry[check_name] = "Passed"
                else:
                    log_entry[check_name] = "Failed"
                    all_passed = False
            except ValueError:
                messagebox.showerror("Error", "Please enter a valid number.")
                return

        self.cursor.execute("INSERT INTO logs (serial, date, action) VALUES (?, ?, ?)", (serial, log_entry["date"], str(log_entry)))
        self.conn.commit()

        if all_passed:
            self.cursor.execute("UPDATE serial_numbers SET last_maintenance = ?, next_maintenance = ? WHERE serial = ?", (datetime.now().strftime("%Y-%m-%d"), (datetime.now() + timedelta(days=365)).strftime("%Y-%m-%d"), serial))
            self.conn.commit()
            self.update_serial_list()
            messagebox.showinfo("Maintenance Result", "Maintenance completed successfully.")
        else:
            messagebox.showwarning("Maintenance Result", "Maintenance completed with some failed checks.")

        self.clear_maintenance_fields()

    def clear_maintenance_fields(self):
        for widget in self.maintenance_frame.winfo_children():
            widget.destroy()
        self.maintenance_button = tk.Button(self.maintenance_frame, text="Perform Maintenance", command=self.perform_maintenance)
        self.maintenance_button.pack()

if __name__ == "__main__":
    root = tk.Tk()
    app = GiraffeWarmerMaintenanceApp(root)
    root.mainloop()
