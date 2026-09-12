import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorTable({ doctor, token }) {

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [authError, setAuthError] = useState(false);

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

    useEffect(() => {
        loadAppointments();
    }, [selectedDate, doctor]);

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
    if (!isReserved(slot))
        return;
    const hour = String(slot.hour).padStart(2, "0");
    const minute = String(slot.minute).padStart(2, "0");
    const slotKey = `${selectedDate}T${hour}:${minute}`;
    const appointment = appointments.find((appointment) => {
        const appointmentKey = appointment.date.slice(0, 16);
        return appointmentKey === slotKey;
    });
    setSelectedSlot({
        ...slot,
        ill: appointment?.ill
    });

    setShowConfirm(true);
};
    
    if (authError) {
        return (
            <div className="confirm-overlay">
                <div className="confirm-box">
                    <h3>لطفاً وارد حساب کاربری خود شوید</h3>
                    <p>
                        نشست شما منقضی شده یا وارد
                        نشده‌اید. برای رزرو نوبت ابتدا
                        باید وارد شوید.
                    </p>
                    <div className="confirm-buttons">
                        <button onClick={() => navigate("/register")}>
                            رفتن به صفحه ورود
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
           <div className="date-selector">
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
                                                ? "rezerv"
                                                : "azad"
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
                        <h3>Appointment details</h3>
                        <p>
                            Date:
                            <strong>
                                {" "}{selectedDate}
                            </strong>
                        </p>
                        <p>
                            Time:
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
                        <p>
                            Ill name:
                            <strong>
                                {" "}{selectedSlot.ill}
                            </strong>
                        </p>
                        <div className="confirm-buttons">
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setSelectedSlot(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default DoctorTable;