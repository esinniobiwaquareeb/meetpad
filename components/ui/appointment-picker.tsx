// src/components/AppointmentDatePicker.tsx
import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const AppointmentDatePicker: React.FC = () => {
  return (
    <div >
      <h2 className="text-lg font-semibold mb-4 text-center"> Select appointment date</h2>
      <div className="flex space-x-4">
        <div className=" flex-1 bg-gray-100 p-4 rounded">
            <div className="flex items-center justify-between mb-2">
              <button className="p-1 rounded-full hover:bg-gray-200">
                <AiOutlineLeft className="w-6 h-6" />
              </button>
              <div className="font-semibold">May 2024</div>
              <button className="p-1 rounded-full hover:bg-gray-200">
                <AiOutlineRight className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-700">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              <div className="text-gray-400">1</div><div className="text-gray-400">2</div><div className="text-gray-400">3</div><div className="text-gray-400">4</div><div className="text-gray-400">5</div><div className="text-gray-400">6</div>
              <div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div>
              <div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div>
              <div>21</div><div>22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div>
              <div>28</div><div>29</div><div>30</div><div>31</div><div className="text-gray-400">1</div><div className="text-gray-400">2</div><div className="text-gray-400">3</div>
            </div>
          </div>
        <div className="flex-1">
          <h3 className="mb-2">Today, 27 March 2024</h3>
          <ul>
            <li className="py-2 px-4 mb-2 rounded bg-gray-100">10:00 am - 11:00 am</li>
            <li className="py-2 px-4 mb-2 rounded bg-gray-100">02:00 pm - 03:00 pm</li>
            <li className="py-2 px-4 mb-2 rounded bg-gray-100">04:00 pm - 05:00 pm</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDatePicker;
