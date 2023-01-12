<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $event = [];
        if ($request->search) {
            $event = Event::where('judul', 'like', '%' . $request->search . '%')->fastPaginate();
        } else {
            $event = Event::fastPaginate();
        }

        return inertia('Auth/Event/Event', ['event' => EventResource::collection($event)]);
    }
    public function create()
    {
        return inertia('Auth/Event/EventCreate');
    }

    public function store(Request $request)
    {
        // dd($request->file('thumbnail'));
        $attr = $request->validate([
            'judul' => 'required',
            'tanggal_mulai' => 'required|date|after:now',
            'tanggal_berakhir' => 'required|date|after:tanggal_mulai',
            'penyelenggara' => 'required',
            'thumbnail' => 'required',
            'kontent' => 'required',
        ]);
        $attr['slug'] = \Str::slug($attr['judul']);
        $attr['thumbnail'] = $request->file('thumbnail') ? $request->file('thumbnail')->storeAs('images/event', $request->file('thumbnail')->getClientOriginalName()) : null;
        $event = Event::create($attr);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menambahkan Data'
        ]);
    }
    public function update($slug)
    {
        $event = Event::where('slug', $slug)->first();

        return inertia('Auth/Event/EventUpdate', ['event' => $event]);
    }
    public function store_update(Request $request)
    {
        // dd($request->all());
        // $attr = $request->validate([
        //     'judul' => 'required',
        //     'tanggal_mulai' => 'required|date|after:now',
        //     'tanggal_berakhir' => 'required|date|after:tanggal_mulai',
        //     'penyelenggara' => 'required',
        //     'thumbnail' => 'required',
        //     'kontent' => 'required',
        // ]);
        $attr = [];
        $judul = $request->data['judul'];
        $attr['slug'] = \Str::slug($judul);
        $attr['thumbnail'] = $request->file('thumbnail') ? $request->file('thumbnail')->storeAs('images/event', $request->file('thumbnail')->getClientOriginalName()) : null;
        $update = Event::findOrFail($request->data['id']);

        $update->update([
            'judul' => $request->data['judul'],
            'tanggal_mulai' => $request->data['tanggal_mulai'],
            'tanggal_berakhir' => $request->data['tanggal_berakhir'],
            'penyelenggara' => $request->data['penyelenggara'],
            'thumbnail' => $attr['thumbnail'],
            'slug' => $attr['slug'],
            'kontent' => $request->data['kontent'],
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menambahkan Data'
        ]);
    }
    public function delete($slug)
    {
        $event = Event::where('slug', $slug)->first();
        $event->delete();
    }
}
