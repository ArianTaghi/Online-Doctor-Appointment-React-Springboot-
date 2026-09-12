import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppointmentTable({ doctor, token }) {

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [existingAppointment, setExistingAppointment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        const newDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const formattedDate =
                `${year}-${month}-${day}`;
            newDates.push(formattedDate);
        }

        setDates(newDates);

        setSelectedDate(newDates[0]);
    }, []);

    const loadAppointments = () => {

        if (!doctor || !selectedDate)
            return;

        fetch(
            `http://localhost:8080/appointment/byDoctor/${doctor.username}_${selectedDate}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                setAuthError(true);
                return null;
            }
            if (!response.ok)
                throw new Error("Failed to fetch appointments");
            return response.json();
        })
        .then(data => {
            if (data === null)
                return;
            setAuthError(false);
            setAppointments(data);
        })
        .catch(error => {
            console.error("Error loading appointments:", error);
        });
    };

    const loadExistingAppointment = () => {

        if (!doctor)
            return;

        if (!selectedDate)
            return;

        fetch(
            `http://localhost:8080/appointment/mine/${doctor.username}_${selectedDate}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                setAuthError(true);
                return null;
            }
            if (!response.ok)
                throw new Error("Failed to fetch existing appointment");
            return response.json();
        })
        .then(data => {
            if (data === null)
                return;
            if (data.length > 0)
                setExistingAppointment(data[0]);
            else
                setExistingAppointment(null);
        })
        .catch(error => {
            console.error("Error loading existing appointment:", error);
        });
    };

    useEffect(() => {
        loadAppointments();
        loadExistingAppointment();
    }, [selectedDate]);

    const generateSlots = () => {
        if (!doctor)
            return [];
        const slots = [];
        for (let hour = doctor.start; hour < doctor.end; hour++)
            for (let minute = 0; minute < 60; minute += 20)
                slots.push({ hour: hour, minute: minute });
        return slots;
    };

    const isReserved = (slot) => {
        const hour = String(slot.hour).padStart(2, "0");
        const minute = String(slot.minute).padStart(2, "0");
        const slotKey = `${selectedDate}T${hour}:${minute}`;

        return appointments.some((appointment) => {
            const appointmentKey = appointment.date.slice(0, 16);
            return appointmentKey === slotKey;
        });
    };

    const handleSlotClick = (slot) => {
        if (isReserved(slot))
            return;
        setSelectedSlot(slot);
        setShowConfirm(true);
    };

    const handleCancelConfirm = () => {
        setShowConfirm(false);
        setSelectedSlot(null);
    };

    const handleConfirm = () => {
        if (!selectedSlot || !doctor || !selectedDate)
            return;

        const hour =
            String(selectedSlot.hour).padStart(2, "0");
        const minute =
            String(selectedSlot.minute).padStart(2, "0");
        const appointmentDate =
            `${selectedDate}T${hour}:${minute}:00`;

        const appointment = {
            date: appointmentDate,
            doctor: doctor.username,
            time: selectedSlot.hour
        };

        const url = existingAppointment
            ? `http://localhost:8080/appointment/change/${existingAppointment.id}`
            : "http://localhost:8080/appointment/add";

        fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(appointment)
            }
        )
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                setAuthError(true);
                setShowConfirm(false);
                setSelectedSlot(null);
                return null;
            }
            if (!response.ok)
                throw new Error("Failed to save appointment");
            return response.json();
        })
        .then(data => {
            if (data === null)
                return;
            if (data === false) {
                console.error("Server rejected the appointment");
                return;
            }
            setShowConfirm(false);
            setSelectedSlot(null);
            loadAppointments();
            loadExistingAppointment();
        })
        .catch(error => {
            console.error("Error saving appointment:", error);
        });
    };

    if (authError) {
        return (
            <div className="confirm-overlay">
                <div className="confirm-box">
                    <h3>Please enter your account</h3>
                    <p>
                        you havent logged in or your toked has expired
                        </p>
                    <div className="confirm-buttons">
                        <button onClick={() => navigate("/register")}>
                        Go to login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const slots = generateSlots();
    const rows = [];
    for (let i = 0; i < slots.length; i += 3)
        rows.push(slots.slice(i, i + 3));

    return (
        <div className="appointment-container">
            {existingAppointment && (
    <div className="appoint-error">
        <div className="appoint-error-title">
            ⚠️ You already have an appointment
        </div>

        <div className="appoint-error-info">
            Your appointment with this doctor is on{" "}
            <strong>{existingAppointment.date.slice(0, 10)}</strong>
            {" "}at{" "}
            <strong>{existingAppointment.date.slice(11, 16)}</strong>.
        </div>

        <div className="appoint-error-help">
            You can select another slot to change your appointment,
            or go to your profile if you want to cancel it.
        </div>
    </div>
)}<div className="date-selector">
                <label>Select a day:</label>
                <select
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                >
                    {dates.map((date) => (
                        <option
                            key={date}
                            value={date}
                        >
                            {date}
                        </option>
                    ))}
                </select>
            </div>

        <div className="appointment-table">
                {rows.map((row, rowIndex) => (
                    <div
                        className="appointment-row"
                        key={rowIndex}
                    >
                        {row.map((slot) => {
                            const reserved =
                                isReserved(slot);
                            const time =
                                `${String(slot.hour).padStart(2, "0")}:${String(slot.minute).padStart(2, "0")}`;
                            return (
                                <div
                                    key={`${slot.hour}-${slot.minute}`}
                                    className={
                                        `appointment-slot ${
                                            reserved
                                                ? "reserved"
                                                : "free"
                                        }`
                                    }
                                    onClick={() =>
                                        handleSlotClick(slot)
                                    }
                                >
                                    {time}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {showConfirm && selectedSlot && (
                <div className="confirm-overlay">
                    <div className="confirm-box">
                        <h3>
                            {existingAppointment
                                ? "Change Appointment?"
                                : "Confirm Appointment"}
                        </h3>
                        <p>
                            {existingAppointment
                                ? "You already have an appointment with this doctor. Do you want to move it to the new time below?"
                                : "Are you sure you want to book an appointment?"}
                        </p>
                        {existingAppointment && (
                            <p>
                                Current time:
                                <strong>
                                    {" "}{existingAppointment.date.slice(0, 10)}
                                    {" "}{existingAppointment.date.slice(11, 16)}
                                </strong>
                            </p>
                        )}
                        <p>
                            {existingAppointment ? "New date:" : "Date:"}
                            <strong>
                                {" "}{selectedDate}
                            </strong>
                        </p>
                        <p>
                            {existingAppointment ? "New time:" : "Time:"}
                            <strong>
                                {" "}
                                {String(
                                    selectedSlot.hour
                                ).padStart(2, "0")}
                                :
                                {String(
                                    selectedSlot.minute
                                ).padStart(2, "0")}
                            </strong>
                        </p>
                        <div className="confirm-buttons">
                            <button
                                onClick={handleCancelConfirm}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                            >
                                {existingAppointment ? "Yes, change it" : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AppointmentTable;