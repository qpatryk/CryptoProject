// Profile.jsx
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Zakładamy, że mamy funkcję getUserProfile, która wykonuje żądanie HTTP GET
                // do API i zwraca dane użytkownika.
                const userData = await getUserProfile();
                setUser(userData);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <div>Ładowanie profilu użytkownika...</div>;
    }

    if (error) {
        return <div>Wystąpił błąd: {error}</div>;
    }

    if (!user) {
        return <div>Nie znaleziono użytkownika.</div>;
    }

    return (
        <div className="profile">
            <h2>Profil Użytkownika</h2>
            <div className="profile-details">
                {user.photo && (
                    <img src={user.photo} alt="Zdjęcie profilowe" className="profile-photo" />
                )}
                <div className="profile-info">
                    <p><strong>Imię:</strong> {user.firstName}</p>
                    <p><strong>Nazwisko:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Możesz dodać więcej informacji o użytkowniku tutaj */}
                </div>
            </div>
            {/* Możesz dodać dodatkowe sekcje, takie jak przyciski do edycji profilu itp. */}
        </div>
    );
};

// Przykładowa funkcja do pobierania danych profilu użytkownika z API
async function getUserProfile() {
    // Tutaj powinno być rzeczywiste wywołanie API
    // Poniżej znajduje się przykładowy kod, który zwraca fikcyjne dane
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                firstName: 'Jan',
                lastName: 'Nowak',
                email: 'jan.nowak@example.com',
                photo: 'https://via.placeholder.com/150',
            });
        }, 1000);
    });
}

export default Profile;
