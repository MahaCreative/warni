<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventDonor extends Controller
{
    public function index()
    {
        $event = Event::latest()->get();
        $eventBerlangsung = Event::where([['tanggal_mulai', '>=', Carbon::now()], ['tanggal_berakhir', '<=', Carbon::now()->endOfMonth()]])->latest()->get()->take(5);
        return inertia('Guest/Event/Index', ['event' => EventResource::collection($event), 'event_berlangsung' => $eventBerlangsung]);
        // return inertia('Event/User/Index', ['event' => ]);
    }

    public function show($slug)
    {
        $event = Event::where('slug', $slug)->first();
        $eventBerlangsung = Event::where([['tanggal_mulai', '>', Carbon::now()]])->latest()->get()->take(5);
        $eventTerbaru = Event::latest()->get()->take(20);
        return inertia('Guest/Event/Show', ['event' => $event, 'event_berlangsung' => $eventBerlangsung]);
    }
}
