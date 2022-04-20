import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import 'react-day-picker/lib/style.css';
import { useAuth } from "../../hooks/auth";
import api from "../../services/apiClient";

import { FiClock, FiPower } from "react-icons/fi";
import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Calendar, Section, Appointment } from "./styles";

import logoImage from '../../assets/logo.svg';
import firstImage from '../../assets/enzo (2).jpg';
import secondImage from '../../assets/john.jpg';

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

const Dashboard: React.FC = () => {

    const { signOut, user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, [])

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) { }
        setSelectedDate(day);
    }, []);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            }
        }).then(response => {
            setMonthAvailability(response.data);
        })

    }, [currentMonth, user.id]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability.filter(monthDay => monthDay.available === false)
        .map(monthDays => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();
            return new Date(year, month, monthDays.day)
        })

        return dates;

    }, [currentMonth, monthAvailability])

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImage} alt='Gobarber' />
                    <Profile>
                        <img src={user.avatar_url === null ? 'https://avatars.githubusercontent.com/u/82480230?v=4' : user.avatar_url} alt={user.name} />
                        <div>
                            <span>Bem vindo</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Horarios agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars.githubusercontent.com/u/87612078?v=4" alt="Jolielton Carvalho" />

                            <strong>Jolielton Carvalho</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointment>
                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                            <div>
                                <img src={secondImage} alt="John Santos" />

                                <strong>John Santos</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                            <div>
                                <img src={firstImage} alt="Enzo Grabriel" />

                                <strong>Enzo Grabriel</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] }
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    )
}

export default Dashboard;

