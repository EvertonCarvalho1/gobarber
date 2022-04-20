import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isToday, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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

interface GetAppointment {
    id: string;
    date: string;
    hourFormatted: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const { signOut, user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
    const [appointments, setAppointments] = useState<GetAppointment[]>([]);

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

    useEffect(() => {
        api.get<GetAppointment[]>('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            const appointmentsFormatted = response.data.map(appointment => {
                return {
                    ...appointment,
                    hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
                }
            })
            setAppointments(appointmentsFormatted)
        });

    }, [selectedDate])

    const disabledDays = useMemo(() => {
        const dates = monthAvailability.filter(monthDay => monthDay.available === false)
        .map(monthDays => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();
            return new Date(year, month, monthDays.day)
        })

        return dates;

    }, [currentMonth, monthAvailability])

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR,
        })
    }, [selectedDate]);

    const isTodayVerify = useMemo(() => {
        return isToday(selectedDate)
    }, [selectedDate]);

    const selectWeekDay = useMemo(() => {

        let stringWeekDay = format(selectedDate, 'cccc', { locale: ptBR, })

        let firstStringWeekDayUppercase = stringWeekDay[0].toUpperCase() + stringWeekDay.slice(1); 
      
        return firstStringWeekDayUppercase

    }, [selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        })
    }, [appointments]); 

    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12;
        })
    }, [appointments]); 

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
                </HeaderContent >
            </Header>
            <Content>
                <Schedule isTodayVerify={isTodayVerify}>
                    <h1>Horarios agendados</h1>
                    <p>
                        <span>{isTodayVerify && 'Hoje'} </span>
                        <span>{selectedDateAsText}</span>
                        <span>{selectWeekDay}</span>
                    </p>

                    <NextAppointment>
                        <strong>Agendamento a seguir</strong>
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
                        {morningAppointments.map((morningAppointment) => {
                            return (
                                <Appointment>
                                <span>
                                    <FiClock />
                                    {morningAppointment.hourFormatted}
                                </span>
                                <div>
                                    <img src={morningAppointment.user.avatar_url} alt={morningAppointment.user.name} />
    
                                    <strong>{morningAppointment.user.name}</strong>
                                </div>
                            </Appointment>
                            )
                        })}
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

